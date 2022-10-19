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




const Main = ({navigation}) => {
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
    

    return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        />
        <Button
            title="Add New Memo" 
            onPress={() =>
                navigation.navigate('write')
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