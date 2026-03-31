/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';

type Props = {
  label: string;
  value: boolean;
  onValueChange?: (value: boolean) => void; 
  disabled?: boolean; 
};

export default function SwitchField({
  label,
  value,
  onValueChange,
  disabled = false,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginVertical: 10,
      }}
    >
      <Text style={{fontSize:20,color:'#f6f6f6',fontWeight:'600'}}>{label}</Text>

      <Switch
        value={value}
        onValueChange={onValueChange ?? (() => {})} 
        disabled={disabled}
      />
    </View>
  );
}