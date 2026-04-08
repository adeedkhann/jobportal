import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        isRefreshing:true
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
            state.isRefreshing=false
        },
        Logout:(state)=>{
             state.user = null
        },
    }
})



export const { setLoading , setUser, logout } = authSlice.actions; 

export default authSlice.reducer;