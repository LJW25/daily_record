import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';
const axios = require('axios');

const Login = ({navigation}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');



    sendLoginRequest = () => {
        axios.post('http://115.145.173.240:4000/test_post',{
            user:{
                uid :id,
                password: password,
            }
        }).then(function (response) {
            console.log(response.data);
            Alert.alert(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });;
    }


    return (
      <View style={
          {padding: 10}}>
        <TextInput
          style={styles.inputContainer}
          placeholder="ID"
          onChangeText={id => setId(id)}
          defaultValue={id}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Password"
          onChangeText={ps => setPassword(ps)}
          defaultValue={password}
        />


        <Button
            title="Login" 
            onPress={() => {sendLoginRequest();}}
            style={styles.button}
              />
        <Text style={{ 
          padding : 30
          }}>
          {text}
        </Text>

        <Button
            title="Register" 
            onPress={() => {sendLoginRequest();}}
            style={styles.button}
            />


      </View>

  );
}


export default Login;

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