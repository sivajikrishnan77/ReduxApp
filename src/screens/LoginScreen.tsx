/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { Alert } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { loginApi } from '../api/authApi';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Product: undefined;
  BottomTab: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;



export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  if (!username || !password) {
    console.log("Enter username and password");
    return;
  }

  try {
    const response = await loginApi(username, password);

  await AsyncStorage.setItem("accessToken", response.accessToken);
  await AsyncStorage.setItem("refreshToken", response.refreshToken);

    navigation.navigate("Product");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 , backgroundColor:'#121212' }}>
      <Text variant="titleLarge" style={{fontWeight:'bold',color:'#de0d0d'}}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginVertical: 10 }}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginVertical: 10 }}
        left={<TextInput.Icon icon="lock" />}
      />
     <Button
  mode="contained"
  onPress={() => {
    console.log("Login button pressed");
    handleLogin();
  }}
>
  Login
</Button>
      <Button onPress={() => navigation.navigate('Signup')}>
        Don’t have an account? Sign Up
      </Button>
    </View>
  );
}