import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/authApi";


type User = {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};





export const loginUser = createAsyncThunk("auth/loginUser",
async({username,password}:{username:string,password:string})=>{
    const response = await loginApi(username,password);
    return response;
}
);

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        updateToken:(state,action)=>{
            state.token=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.token=action.payload.accessToken;
            
        })
        .addCase(loginUser.rejected,(state)=>{
            state.loading=false;
        });
    },
});
export const { updateToken } = authSlice.actions;
export default authSlice.reducer;