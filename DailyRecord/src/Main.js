import React, { memo, useState, useEffect } from 'react';
import { SafeAreaView,
    StatusBar,
    useColorScheme,
    TouchableOpacity,
    Text, View, Button, StyleSheet } from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native'
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';



const Main = ({navigation}) => {
  
    const GoogleApiKey = "AIzaSyDTIRO-xGiFTl_EuI_RYQIV9wXOE6PKWwQ";
    const WeathhermapApiKey = "5c75094647f377c1415af4bd0cc1d185";
    
    const isFocused = useIsFocused();
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const Section = ({children, memo}) => {
        const isDarkMode = useColorScheme() === 'dark';
    
        return (
          <TouchableOpacity style={styles.flatContainer} onPress={()=>
            navigation.navigate('showMemo', {_memo_:memo})
          }>
            <Text
              style={[
                styles.sectionTitle,
                {color: isDarkMode ? Colors.white : Colors.black,},
              ]}>
              {memo.title}
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                {color: isDarkMode ? Colors.light : Colors.dark,},
              ]}>
              {children}
            </Text>
          </TouchableOpacity >
        );
      };
    

    let [curMemoList, setCurMemoList] = useState([]);
    let [curMemos, setCurMemos] = useState([]);

    const getMemoList = async(category) => {
        const memoList = await AsyncStorage.getItem('MemoList');
        let tempList = [];
        let tempMemoList = [];

        if(memoList == null){
            tempList = [];
        }
        else{
            tempList = JSON.parse(memoList)[category];
            tempList.forEach(async(curID) => {
                const memo = await AsyncStorage.getItem(curID);
                tempMemoList.unshift(JSON.parse(memo));
            });
        }
        return tempMemoList;
    }

    useEffect(() => {
        async function getMemo() {
            const _curMemo = await getMemoList("default");
            setCurMemos(_curMemo);
        }
        getMemo();
    }, [isFocused]);

    const renderItem = ({item}) => {
        //console.log(item.id);
        
        return (
            <Section memo={item}>
              {item.content}
            </Section>
        );
    }
    //============================= API
    const setWeather = (weather_id) => {
      let w = "";
      if(weather_id<200) w = "Clear";
      else if(weather_id <300) w = "Thunderstorm";
      else if(weather_id <400) w = "Drizzle";
      else if(weather_id <600) w = "Rain";
      else if(weather_id <700) w = "Snow";
      else if(weather_id <800) w = "Atmosphere";
      else if(weather_id==800) w = "Clear";
      else if(weather_id==801) w = "Clouds1";
      else if(weather_id==802) w = "Clouds2";
      else if(weather_id==803) w = "Clouds3";
      else if(weather_id==804) w = "Clouds3";
      else w ="Clear";

      console.log(w);
      return w;
    }

  
    
    const getApiData = async(lat, lon, place_id) => {
      console.log(lat, lon, place_id)
      var {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeathhermapApiKey}`
        );
      const weather_id = data.weather[0].id;
      const weather = setWeather(weather_id);

      var {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?fields=name,types,icon&place_id=${place_id}&key=${GoogleApiKey}&language=ko`
      ).catch(function (error) {
        console.log(error);
      });
      
      
      console.log("= Weather =====");
      console.log(weather_id);
      console.log("= API Data =====");
      console.log(JSON.stringify(data));

      const place = {
        "name": route.params.weather,
        //"type": data.result.types[0],
        "icon": data.result.icon,
      }

      navigation.navigate('write', {weather: weather, place: place});
    }

    const reverseGeocoding = async (lat, lon) => {
      console.log(lat, lon)
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GoogleApiKey}`
        ).catch(function (error) {
          console.log(error);
        });
        
      console.log("= place Api =====");
      console.log(data.results[0].place_id);

      getApiData(lat, lon, data.results[0].place_id);
      //getWeather(lat, lon);
    }


    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(latitude, longitude);
            reverseGeocoding(latitude, longitude);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    }


    return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        />
        <Button
            title="Add New Memo" 
            onPress={() =>
              getLocation()
            }
            style={styles.button}
        />
        <View style={{padding: 10}}>
          <Text>Memo List</Text>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 10
          }}>
          <FlatList
            data = {curMemos}
            renderItem={renderItem}
            keyExtractor={(item)=>item.id}
            ListEmptyComponent={() => (
                <View>
                  <Text> No memo</Text>
                </View>
              )}
          />
        </View>
    </SafeAreaView>
  );
}


export default Main;

const styles = StyleSheet.create({
    
    button: {
      padding : 20,
      marginTop: 30,
    },

    flatContainer: {
        borderRadius: 10,
        borderColor: "grey",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: "grey",
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
  });