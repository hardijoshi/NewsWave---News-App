import { View, Text } from 'react-native'
import React from 'react'
import Home from './screen/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsDetail from './screen/NewsDetail';
import Entertainment from './screen/Entertainment';
import Sports from './screen/Sports';
import Business from './screen/Business';
import Technology from './screen/Technology';
import World from './screen/World';
import Health from './screen/Health';
import Science from './screen/Science';
import SearchResult from './screen/SearchResult';
import Developer from './screen/Developer';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='NewsDetail' component={NewsDetail}/>
        <Stack.Screen name='India' component={Business}/>
        <Stack.Screen name='Entertainment' component={Entertainment}/>
        <Stack.Screen name='Sports' component={Sports}/>
        <Stack.Screen name='Technology' component={Technology}/>
        <Stack.Screen name='World' component={World}/>
        <Stack.Screen name='Health' component={Health}/>
        <Stack.Screen name='Science' component={Science}/>
        <Stack.Screen name='SearchResult' component={SearchResult}/>
        <Stack.Screen name='Developer' component={Developer}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App