import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import { weImagePath } from './image/weather/weImgPath';
import {Picker} from '@react-native-picker/picker';
import { setWeatherText } from './utils';

const Write = ({navigation, route}) => {
    const weather = route.params.weather
    const isFocused = useIsFocused();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [category, setCategory] = useState('');

    //update memoList
    const addInMemoList = async(id) => {
        try{
            let memoList = JSON.parse(await AsyncStorage.getItem('MemoList'));
            console.log(JSON.stringify(memoList));

            if(memoList == null){
                memoList = {
                  'default': [],
                  'diary': [],
                  'memo': [],
                };
            }

            console.log(category);
            
            memoList['default'].push(id);
            memoList[category].push(id);
            alert('메모가 저장되었습니다!');
            
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

    const addMemo = () => {
        const id = Date.now().toString();
        console.log(id);
        
        const newMemo = {
            id: id,
            title: title,
            content: content,
            tag: tag,
            date: Date.now(),
            category: category,
            place:{
                name: route.params.place.name,
                icon: route.params.place.icon,
            },
            weather_type: route.params.weather,
        }
        
        saveMemo(id, newMemo);
    }

    
    
    return (
      <View>
        <View style={styles.envContainer}>
          <View style={styles.weatherContainer}>
            <Image 
            source={weImagePath[weather]}
            style={styles.weatherImage} />
            <Text style={styles.weatherText}>{setWeatherText(route.params.weather)}</Text>
          </View>
          <View style={styles.placeContainer}>
            <Image 
            source={{uri : route.params.place.icon}}
            style={styles.placeImage} />
            <Text style={styles.placeText}>{route.params.place.name}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.inputContainer}
            placeholder="제목"
            onChangeText={title => setTitle(title)}
            defaultValue={title}
          />
          <TextInput
            style={styles.contentsContainer}
            placeholder="내용을 작성해 주세요"
            multiline
            onChangeText={content => setContent(content)}
            defaultValue={content}
          />
          <TextInput
            style={styles.tagContainer}
            placeholder="태그"
            onChangeText={tag => setTag(tag)}
            defaultValue={tag}
          />
          
        </View>
       <View style={styles.btmContainer}>
        <Picker
          style={styles.pickerContainer}
          selectedValue={category}
          onValueChange={category =>setCategory(category)}>
          <Picker.Item label="default" value="default" />
          <Picker.Item label="diary" value="diary" />
          <Picker.Item label="memo" value="memo" />
        </Picker>

        <Button
          title="저장" 
          onPress={() => {
            addMemo();
          }}
          style={styles.button}
          />
       </View>
      </View>
        
  );
}

export default Write;
const backColor = 'Orange';

const styles = StyleSheet.create({
    
    envContainer: {
      flexDirection: 'row',
      padding: 5,
      backgroundColor: 'lightgrey',
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
    weatherContainer: {
      flex: 1,
      alignItems: "center",
      fontWeight: 'bold',
    },
    weatherText: {
      fontWeight: 'bold',
    },
    placeContainer: {
      flex: 3,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'row',
    },
    placeText: {
      flexWrap: 'wrap',
      width: '70%',
      numberOfLines: 3,
      fontWeight: 'bold',
    },
    weatherImage: {
      width: 80,
      height: 80,
    },
    placeImage: {
      margin:10,
      width: 70,
      height: 70,
    },

    contentContainer: {
      padding:10,
    },
    inputContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      fontSize: 17,
      fontWeight: 'bold',
    },
    contentsContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 250,
      multiline: 'true',
      borderTopColor: 'black',
      borderTopWidth: 1,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      textAlignVertical: 'top',
    },
    tagContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
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
    btmContainer: {
      flexDirection: 'row',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 10,
    },
    pickerContainer: {
      flex: 1,
    },
    button: {
      flex: 1,
    },
  });