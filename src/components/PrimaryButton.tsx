/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button } from 'react-native-paper';
import { ViewStyle } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  style?:ViewStyle;
};

export default function PrimaryButton({ text, onPress,style }: Props) {
  return (
    <Button mode="contained"
     onPress={onPress} 
     style={[{ marginVertical: 10 },style]}
    >
      {text}
    </Button>
  );
}