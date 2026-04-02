import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/authApi";


export const loginUser = createAsyncThunk("auth/loginUser",
async({username,password}:{username:string,password:string})=>{
    const response = await loginApi(username,password);
    return response;
}
);

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null,
        loading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.token=action.payload.accesstoken;
            
        })
        .addCase(loginUser.rejected,(state)=>{
            state.loading=false;
        });
    },
});

export default authSlice.reducer;