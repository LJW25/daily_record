import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';
const axios = require('axios');

const register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');



    sendLoginRequest = () => {
        axios.post('http://115.145.179.57:4000/register',{
            user:{
                email : email,
                username : name,
                password: password,
                type : 1,
            }
        }).then(function (response) {
            console.log(type(response.data));
            //console.log('aaa');
            //console.log(JSON.stringify(response.data)['message']);
            //Alert.alert(JSON.stringify(response.data)['message']);
          })
          .catch(function (error) {
            console.log(error.data);
          });
    }


    return (
      <View style={
          {padding: 10}}>
        <Text>Input your information</Text>

        <TextInput
          style={styles.inputContainer}
          placeholder="email"
          onChangeText={email => setEmail(email)}
          defaultValue={email}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Username"
          onChangeText={name => setName(name)}
          defaultValue={name}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Password"
          onChangeText={ps => setPassword(ps)}
          defaultValue={password}
        />
        <Button
            title="Register" 
            onPress={() => {sendLoginRequest();}}
            style={styles.button}
            />
      </View>

  );
}


export default register;

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