/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { getProducts } from '../api/productApi';

type Product ={
    id:number,
    title:string,
    price:number,
    thumbnail:string,
};

export default function ProductScreen() {
    
const [products,setproducts]=useState<Product[]>([]);
const [loading,setloading]=useState(true);

    const fetchProducts = async () => {

        try{
            const data = await getProducts();
            setproducts(data);
        }catch(error){
            console.log("Fetch products error:",error);
        }finally{
            setloading(false);
        }
};

useEffect(()=>{
    fetchProducts();
},[]);

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