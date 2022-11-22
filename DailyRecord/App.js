import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Main from './src/Main.js';
import Write from './src/Write.js';
import ReadMemo from './src/ReadMemo.js';
import EditMemo from './src/EditMemo.js';


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
        <Stack.Screen name="Write" component={Write} />
        <Stack.Screen name="ReadMemo" component={ReadMemo} />
        <Stack.Screen name="EditMemo" component={EditMemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;