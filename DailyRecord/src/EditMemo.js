import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { weImagePath } from './image/weather/weImgPath';
import { setWeatherText } from './utils';

const EditMemo = ({navigation, route}) => {
    
    const Memo = route.params._memo_;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');


    //save new Memo in loacal storage
    const saveMemo = async(id, memo)=>{
        try{
            await AsyncStorage.setItem(id, JSON.stringify(memo));
            alert(`메모가 수정되었습니다!`);
            navigation.navigate('main')
        }
        catch(error){
            console.log(error);
            alert(error);
        }
    }

    const addMemo = () => {
        
        const newMemo = {
            id: Memo.id,
            title: title,
            content: content,
            tag: tag,
            date: Memo.date,
            category: Memo.category,
            place:{
                name: Memo.place.name,
                icon: Memo.place.icon,
            },
            weather_type: Memo.weather_type,
        }
        
        saveMemo(Memo.id, newMemo);
    }

    useEffect(() => {
      setTitle(Memo.title);
      setContent(Memo.content);
      setTag(Memo.tag);
    }, []);

    
    return (
      <View>
        <View style={styles.envContainer}>
          <View style={styles.weatherContainer}>
            <Image 
            source={weImagePath[Memo.weather_type]}
            style={styles.weatherImage} />
            <Text style={styles.weatherText}>{setWeatherText(Memo.weather_type)}</Text>
          </View>
          <View style={styles.placeContainer}>
            <Image 
            source={{uri : Memo.place.icon}}
            style={styles.placeImage} />
            <Text style={styles.placeText}>{Memo.place.name}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.inputContainer}
            placeholder="제목"
            onChangeText={title => setTitle(title)}
            defaultValue={Memo.title}
          />
          <TextInput
            style={styles.contentsContainer}
            placeholder="내용을 입력해 주세요"
            multiline
            onChangeText={content => setContent(content)}
            defaultValue={Memo.content}
          />
          <TextInput
            style={styles.tagContainer}
            placeholder="태그"
            onChangeText={tag => setTag(tag)}
            defaultValue={Memo.tag}
          />
          
        </View>
        <Button
              title="저장" 
              onPress={() => {
                  addMemo();
              }}
              style={styles.button}
              />
      </View>
        
  );
}

export default EditMemo;

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

    button: {
      padding: 20,
      marginTop: 30,
    },
  });