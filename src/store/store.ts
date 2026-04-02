import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authreducer from "./slices/authSlice";


export const store = configureStore({
    reducer:{
        products:productReducer,
        auth:authreducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;