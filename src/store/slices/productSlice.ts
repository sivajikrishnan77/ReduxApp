
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../api/productApi";
// import { get } from "react-native/Libraries/NativeComponent/NativeComponentRegistry";

export type Product = {
    id:number,
    title:string,
    price:number,
   thumbnail:string,
};

type ProductState = {
    list:Product[],
    loading:boolean,
};

const initialState:ProductState = {
    list:[],
    loading:false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts",async()=>{
    const data = await getProducts();
    return data;
});

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.list=action.payload;
            state.loading=false;
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.loading=false;
        });
    },
});

export default productSlice.reducer;