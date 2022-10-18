import React, { memo, useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ShowMemo = ({navigation, route}) => {
    const Memo = route.params._memo_;

    const delMemo = async() => {
        const _memoList = await AsyncStorage.getItem('MemoList');
        let memoList = JSON.parse(_memoList);
        memoList['default'] = memoList['default'].filter((i) => i !== Memo.id);

        console.log(memoList);
        
        await AsyncStorage.setItem('MemoList', JSON.stringify(memoList));
        await AsyncStorage.removeItem(Memo.id);
        alert(`Delete memo: ${Memo.title}`);
        console.log(`Delete memo: ${Memo.id}`);

        navigation.navigate('main')
    }

    return (
      <View style={
          {padding: 10}}>
        
        <View>
            <Text style={styles.titleContainer}>
                {Memo.title}
            </Text>
            <Text style={styles.contentsContainer}>
                {Memo.content}
            </Text>
            <Text style={styles.tagContainer}>
                {Memo.tag}
            </Text>
        </View>

        <Button
            title="Delete" 
            onPress={() => {
                delMemo();
            }}
            style={styles.button}
        />
        <Button
            title="Back to Main" 
            onPress={() => {
                navigation.navigate('main')
            }}
            style={styles.button}
        />

      </View>

  );
}

export default ShowMemo;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:'15%',
      fontSize:24,
      padding:10,
    },
    contentsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50%',
        padding:10,
      },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:'10%',
        color:'blue',
        padding:10,
      },
    button: {
        
      height:'10%',
      padding : 20,
      marginTop: 30,
    },
  });