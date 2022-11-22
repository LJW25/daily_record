import React, { memo, useState } from 'react';
import { Image, Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { weImagePath } from './image/weather/weImgPath';
import { setWeatherText, colorStyle } from './utils';

const ReadMemo = ({navigation, route}) => {
    const Memo = route.params._memo_;
    const _color_ = colorStyle[Memo.weather_type];

    const delMemo = async() => {
        const _memoList = await AsyncStorage.getItem('MemoList');
        let memoList = JSON.parse(_memoList);
        memoList["default"] = memoList["default"].filter((i) => i !== Memo.id);
        memoList[Memo.category] = memoList[Memo.category].filter((i) => i !== Memo.id);

        console.log(memoList);
        
        await AsyncStorage.setItem('MemoList', JSON.stringify(memoList));
        await AsyncStorage.removeItem(Memo.id);
        alert(`메모가 삭제되었습니다: ${Memo.title}`);
        console.log(`Delete memo: ${Memo.id}`);

        navigation.navigate('main')
    }
    
    const editMemo = () => {
      navigation.navigate('EditMemo', {_memo_: Memo});
    }

    return (
      <View style={{backgroundColor:_color_.backColor}}>
        <View style={styles.btnContainer}>
          <View style={{width: 120, margin: 10}}>
          <Button
              title="수정" 
              onPress={() => {
                editMemo();
              }}
          />
          </View>
          <View style={{width: 120, margin: 10}}>
          <Button
              title="삭제" 
              onPress={() => {
                delMemo();
              }}
          />
          </View>
        </View>
        
        <View style={styles.contentContainer}>
            <Text style={[styles.inputContainer, {color:_color_.fontColor}]}>
                {Memo.title}
            </Text>
            <Text style={[styles.contentsContainer,
                          {borderTopColor:_color_.borderColor,
                          borderBottomColor:_color_.borderColor,
                          color:_color_.fontColor}]}>
                {Memo.content}
            </Text>
            <Text style={[styles.tagContainer, {color:_color_.fontColor}]}>
                {Memo.tag}
            </Text>
        </View>

        <View style={[styles.envContainer, 
                    {backgroundColor:_color_.backColor, 
                    borderBottomColor:_color_.backColor}]}>
          <View style={styles.weatherContainer}>
            <Image 
            source={weImagePath[Memo.weather_type]}
            style={styles.weatherImage} />
            <Text style={[styles.weatherText, {color:_color_.envFontColor}]}>
              {setWeatherText(Memo.weather_type)}
              </Text>
          </View>
          <View style={styles.placeContainer}>
            <Image 
            source={{uri : Memo.place.icon}}
            style={styles.placeImage} />
            <Text style={[styles.placeText, {color:_color_.envFontColor}]}>{Memo.place.name}</Text>
          </View>
        </View>
      </View>
  );
}

export default ReadMemo;
const styles = StyleSheet.create({
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  envContainer: {
    flexDirection: 'row',
    padding: 5,
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
    height: 36,
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 250,
    multiline: 'true',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tagContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },

  });