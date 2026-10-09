import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"


// store the userslice data in store function for redux state manage
export const store = configureStore({
  reducer: {
    user: userSlice
  }
})