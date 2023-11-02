import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser:(state,{payload})=>{
            state.user = payload
        },
        removeUser:(state)=>{
            state.user = null
        },
        updateToken:(state,{payload})=>{
            state.token = payload
        },
        removeToken:(state)=>{
            state.token = null
        }
    }
})

export const {updateUser,removeUser,updateToken,removeToken}=userSlice.actions

export default userSlice.reducer