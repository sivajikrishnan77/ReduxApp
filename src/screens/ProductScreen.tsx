/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
// import { getProducts } from '../api/productApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api/client.ts';

type Product ={
    id:number,
    title:string,
    price:number,
    thumbnail:string,
};

export default function ProductScreen() {
    
   export const fetchProducts = createAsyncThunk("products/fetchProducts",

   async ()  => {

    const response = await api.get("/products");
    return response.data.products;

   }
);

  
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
        <FlatList
        data={products}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={renderItem}
        
        />
    </View>
)
}