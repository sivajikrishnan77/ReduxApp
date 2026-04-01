
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"products",
    initialState:{
        list:[],
        loading:false,
    },
    reducers:{},
});

export default productSlice.reducer;