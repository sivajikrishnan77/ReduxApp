/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function DatePickerField({ value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const formattedDate = value
    ? value.toDateString()
    : 'Select Date of Birth';
    

  return (
    <View style={styles.container}>

      {/* 👇 Clickable DOB field */}
      <TouchableOpacity onPress={() => setShow(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            borderRadius: 8,
            // borderColor: '#aaa',
            backgroundColor: '#2a2a2a',
          }}
        ><Ionicons name="calendar-outline" size={20} color="#aaa" />
          <Text style={{ flex:1,marginLeft:10, color: '#fff' }}>{formattedDate}</Text>
          
        </View>
      </TouchableOpacity>

      {/* 👇 Date Picker */}
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display=  "calendar"
          maximumDate={new Date()} // 👈 prevents future DOB
          onChange={(event, selectedDate) => {
            setShow(false);

            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal:15,
    borderColor:'#dad3d3',
  },
});