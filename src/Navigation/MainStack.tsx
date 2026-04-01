/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../routes/Header';
import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import  ProductScreen  from '../screens/ProductScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = 
{
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Product: undefined;
  BottomTab: undefined;
};

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{title:'Sivaji',header:(props)=><Header {...props} />}}/>
      {/* <Stack.Screen name="Signup" component={SignupScreen} options={{title:'Sivaji',header:(props)=><Header {...props} />}}/> */}
      <Stack.Screen name="Product" component={ProductScreen} options={{title:'Product Screen',header:(props)=><Header {...props} />}}/>
      
    </Stack.Navigator>
  );
}