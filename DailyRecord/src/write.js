import React, { memo, useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Write = ({navigation}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');

    //update memoList
    const addInMemoList = async(id) => {
        try{
            let memoList = JSON.parse(await AsyncStorage.getItem('MemoList'));

            if(memoList['default'] == null){
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
                navigation.navigate('main')
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