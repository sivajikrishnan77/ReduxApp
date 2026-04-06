/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackHeaderProps;

const Header = ({ navigation, route, options, back }: Props) => {
  const title = options.title ?? route.name;
  const isHome = route.name === 'BottomTab';

  return (
    <SafeAreaView style={{ backgroundColor: '#1f1f1f' }}>
      <View style={styles.container}>

       {isHome ? (
            <TouchableOpacity>
              <Ionicons name="menu" size={24} color="#fff" />
           </TouchableOpacity>
        ) : back ? (
           <TouchableOpacity onPress={() => navigation.goBack()}>
           <Ionicons name="arrow-back" size={24} color="#fff" />
           </TouchableOpacity>
        ) : (
  <View style={{ width: 24 }} />
)}

        {/* CENTER */}
        <Text style={styles.title}>{title}</Text>

        {/* RIGHT */}
        {isHome ? (
          <View style={styles.rightContainer}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_cW-MmCcwYw3OVneVktbkPlnJRqQv6vcp6oPNVfa5cPdor4V6963oO4MFyRJF3XZj24oXl3brej1MFBs5I8NT4csZvfjjnZEgBMgraAsbZQ&s=10' }}
              style={styles.avatar}
            />
          </View>
        ) : (
          <View style={{ width: 36 }} />
        )}

      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    position: 'relative',
  },

  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 40, 
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});