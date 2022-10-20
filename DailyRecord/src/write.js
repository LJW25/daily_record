import React, { memo, useState, useEffect } from 'react';
import { Image, TextInput, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const Write = ({navigation}) => {
    const isFocused = useIsFocused();

    const GoogleAPIkey = "AIzaSyDTIRO-xGiFTl_EuI_RYQIV9wXOE6PKWwQ";
    const WeatherAPIkey = "5c75094647f377c1415af4bd0cc1d185";


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [pos, setPos] = useState('');
    const [wicon, setWicon] = useState('');

    //update memoList
    const addInMemoList = async(id) => {
        try{
            let memoList = JSON.parse(await AsyncStorage.getItem('MemoList'));
            console.log(JSON.stringify(memoList));

            if(memoList == null){
                memoList = {'default': [id]};
            }
            else {
                memoList['default'].push(id);
                alert('pushed!');
            }
            console.log(JSON.stringify(memoList));

            await AsyncStorage.setItem('MemoList', JSON.stringify(memoList));
            console.log('updated Memo List!');
        }
        catch(error){
            console.log(error);
            alert(error);
        }
    }

    const getWeather = async (lat, lon) => {
      console.log(lat, lon)
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherAPIkey}`
      );
      console.log("= Weather =====");
      //console.log(data)
      console.log(data.weather[0].id);
    }
    
    const getPlaceDetail = async(place_id) => {
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?fields=name,types,icon&place_id=${place_id}&key=${GoogleAPIkey}`
      );
      console.log("= place detail Api =====");
      //console.log(data)
      console.log(JSON.stringify(data));
      setWicon(data.result.icon);

    }

    const reverseGeocoding = async (lat, lon) => {
      console.log(lat, lon)
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GoogleAPIkey}`
      );
      console.log("= place Api =====");
      //console.log(data)
      console.log(data.results[0].place_id);
      getPlaceDetail(data.results[0].place_id);
    }

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
            //console.log(position.coords);
            setPos(position.coords);

            getWeather(position.coords.latitude, position.coords.longitude);
            reverseGeocoding(position.coords.latitude, position.coords.longitude);
            console.log(pos);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    }

    //save new Memo in loacal storage
    const saveMemo = async(id, memo)=>{
        try{
            await AsyncStorage.setItem(id, JSON.stringify(memo));
            addInMemoList(id);
            console.log(`Memo:${id} succefully saved!`);
            
            navigation.navigate('main')
        }
        catch(error){
            console.log(error);
            alert(error);
        }
    }

    const addMemo = () => {
        const id = Date.now().toString();
        console.log(id);
        
        const newMemo = {
            id: id,
            title: title,
            content: content,
            tag: tag,
            date: Date.now(),
            category: 'default',
            place:{
                place_id: '',
                place_type: '',
            },
            weather_type:'',
        }
        
        saveMemo(id, newMemo);
    }

    
    useEffect(() => {
      getLocation();
  }, [isFocused]);

    
    return (
      <View style={
          {padding: 10}}>
        
        <TextInput
          style={styles.inputContainer}
          placeholder="Title"
          onChangeText={title => setTitle(title)}
          defaultValue={title}
        />
        <View>
          <Image source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png"}} />
        
          <Image source={{uri:wicon => setWicon(wicon)}}
          defaultSource={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png"}} />
        </View>
        <TextInput
          style={styles.contentsContainer}
          placeholder="Contents"
          multiline
          onChangeText={content => setContent(content)}
          defaultValue={content}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Tag"
          onChangeText={tag => setTag(tag)}
          defaultValue={tag}
        />
        <Button
            title="Save" 
            onPress={() => {
                addMemo();
            }}
            style={styles.button}
            />

      </View>

  );
}

export default Write;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
    },
    contentsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 300,
      },
    input: {
      flex: 1,
      padding: 20,
      borderBottomColor: '#bbb',
      borderBottomWidth: 1,
      fontSize: 24,
      marginLeft: 40,
      marginRight: 40,
    },
    button: {
      padding : 20,
      marginTop: 30,
    },
    image: {
      width: 60,
      height: 60,
    },
  });