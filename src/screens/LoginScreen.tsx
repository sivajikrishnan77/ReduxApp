/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loginUser } from '../store/slices/authSlice';

type RootStackParamList = {
  Login: undefined;
  Product: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;



export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

const {loading}=useSelector((state:RootState)=>state.auth);

const handleLogin = async () => {


  console.log("Username:", username);
  console.log("Password:", password);



  const result = await dispatch(loginUser({username,password}));

     console.log("Result:",result);

  if (loginUser.fulfilled.match(result)) {
    navigation.navigate("Product");
 
  }
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 , backgroundColor:'#eee6e6' }}>
      <Text variant="titleLarge" style={{fontWeight:'bold',color:'#0b0b0b'}}>Login</Text>
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
  loading={loading}
  onPress= {
    handleLogin
  }
>
  Login
  </Button>
    </View>
  );
}