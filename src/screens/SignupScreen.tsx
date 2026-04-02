/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { TextInput, Text} from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from '../components/Label';
import TextInputField from '../components/TextInput';
import DropDown from '../components/DropDown';
import PrimaryButton from '../components/PrimaryButton';
import Loader from '../components/Loader';
import SwitchField from '../components/SwitchField';
import DatePickerField from '../components/DatePickerField';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

 
  const calculateAge = (date: Date | null) => {
    if (!date) return 0;

    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    return age;
  };

  const age = calculateAge(dob);
  const isEligible = age >= 18;

  const handleSignup = () => {
  
    if (!name || !dob || !mobile) {
      Alert.alert('Warning', 'Fill all required fields');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      console.log({
        name,
        dob,
        age,
        maritalStatus,
        mobile,
        isEligible,
      });
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{fontWeight:'bold',color:'#de0d0d',textAlign:'center',paddingBottom:20}}>Sign Up</Text>

      {/* Name */}
      {/* <Label text="Name" /> */}
      <TextInputField
        label='Name'
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        icon="account"
      />

      {/* DOB */}
      <Label text="DOB" />
      <DatePickerField value={dob} onChange={setDob} />

      {/* Age (readonly) */}
      <Label text={`Age: ${age}`} />

      {/* Marital Status */}
      <Label text="Marital Status" />
      <DropDown
        value={maritalStatus}
        setValue={setMaritalStatus}
        placeholder='Select Martial Status'
        list={[
          { label: 'Single', value: 'single' },
          { label: 'Married', value: 'married' },
        ]}
        icon="heart"
      />

      {/* Mobile */}
      <TextInput
      label='Mobile Number'
        value={mobile}
        onChangeText={setMobile}
        keyboardType="number-pad"
        placeholder="Enter mobile number"
        left={<TextInput.Icon icon="phone" />}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 8,
          height: 50,}}
      />
      

      {/* Voting eligibility */}
      <SwitchField
        label="Eligible for Voting"
        value={isEligible}
        
        
    
      />

      {/* Button */}
      <PrimaryButton text="Sign Up" onPress={handleSignup} style={{backgroundColor:'#ba0f0ff0',borderColor:'#000000'}}/>

      {/* Loader */}
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop:0,
    paddingBottom:90,
    justifyContent: 'center',
    backgroundColor : '#080808',
  },
});