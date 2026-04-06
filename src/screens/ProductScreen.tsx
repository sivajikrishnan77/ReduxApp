/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{AppDispatch,RootState} from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';
import {Product} from '../store/slices/productSlice';



export default function ProductScreen() {
     const dispatch = useDispatch<AppDispatch>();

     const {list,loading}=useSelector((state:RootState)=>state.products);

     useEffect(()=>{
        dispatch(fetchProducts());
     },[dispatch]);

  
const renderItem = ({item}:{item:Product})=>{
    return(
        <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        borderRadius:10,
        padding:15,
        backgroundColor:'#1e1e1e',
     }}>

        <Image source={{uri:item.thumbnail}} style={{width:60,
            height:60,
            marginRight:10,
            borderRadius:10,}}/>
            <View style={{flex:1}}>
            <Text style={{fontSize:16,color:'#fff'}}>{item.title}</Text>
            <Text style={{marginTop:5,color:'#ff6b6b'}}>${item.price}$</Text>
        </View>
        </View>
    );
};
if(loading){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#ff6b6b" />
        </View>
    );
};
return(
    <View style={{flex:1,backgroundColor:'#121212',padding:15,}}>
        <FlatList<Product>
        data={list}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={renderItem}
        
        
        />
    </View>
)
}