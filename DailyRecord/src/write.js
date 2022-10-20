import React, { memo, useState, useEffect  } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const Write = ({navigation}) => {

    state = {
      isLoading: true,
      temp: "",
      latitude: 0,
      longitude: 0,
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');

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
    

    
    getWeather = async (lat, lon) => {
      console.log(lat, lon)
      const APIkey = "5c75094647f377c1415af4bd0cc1d185";
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
      );
      console.log("======");
      console.log(data.weather.main);
      this.setState({
        temp: data.main.temp,
        isLoading: false
      });
    }


    const getGeolocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = JSON.stringify(position.coords.latitude);
          const longitude = JSON.stringify(position.coords.longitude);
          //getPlaceDetail(latitude, longitude);
          
          this.getWeather(latitude, longitude)
          this.setState({
            latitude: latitude,
            longitude: longitude
          })
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };


    const addMemo = () => {
        const id = Date.now().toString();
        console.log(id);
        getGeolocation()

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

    return (
      <View style={
          {padding: 10}}>
        <TextInput
          style={styles.inputContainer}
          placeholder="Title"
          onChangeText={title => setTitle(title)}
          defaultValue={title}
        />
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
  });