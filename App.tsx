import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';   
import MainStack from './src/Navigation/MainStack';
import { store } from './src/store/store';
import { enableScreens } from 'react-native-screens';

enableScreens();
export default function App(){
  return (
    <PaperProvider>
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
    </PaperProvider>
  );
}