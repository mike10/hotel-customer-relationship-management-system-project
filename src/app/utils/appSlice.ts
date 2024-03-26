import { createSlice } from '@reduxjs/toolkit'
import { IGetRooms } from '@/app/utils/constants' 

const initialState: {
    auth: boolean,
    mess: string,
    rooms: Array<IGetRooms>,
 } = {auth:false, mess:'', rooms:[]}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuth(state) {
      state.auth = true;
    },
    setMess(state, action) {
      state.mess = action.payload;
    },
    registration(state, action) {},
    enter(state, action) {},
    checkIn(state, action) {},
    //userAdded() {},
    roomAdded(state, action) {
      state.rooms = action.payload;
    },
  },
})

export const { /* userAdded, */ roomAdded, registration, enter, setAuth, setMess, checkIn } = appSlice.actions
export default appSlice.reducer