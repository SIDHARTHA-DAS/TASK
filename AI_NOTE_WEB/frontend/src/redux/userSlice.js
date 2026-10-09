import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState:{
    userData:null
  },

  //  create reducers function for setuser data 
  reducers:{
    setUserData:(state, action)=>{
      state.userData = action.payload
    },


    //  create reducers function for update credits 
    updateCreadits:(state,action)=>{
      if(state.userData){
        state.userData.credits = action.payload
      }
    }
  }
})


export const {setUserData, updateCreadits} = userSlice.actions

export default userSlice.reducer