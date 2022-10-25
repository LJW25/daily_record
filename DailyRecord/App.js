import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Main from './src/Main.js';
import Write from './src/Write.js';
import ShowMemo from './src/ShowMemo.js';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            title: 'Daily Record',
          }}
        />
        <Stack.Screen name="write" component={Write} />
        <Stack.Screen name="showMemo" component={ShowMemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;