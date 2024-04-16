import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IRoom } from '@/utils/constants' 
import { RootState } from './store';

const initialState: {
    auth: boolean,
    mess: string,
    rooms: Array<IRoom>,
    room?: IRoom
 } = {auth:false, mess:'', rooms:[]}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuth(state) {
      state.auth = true;
    },
    setMess(state, action:PayloadAction<string>) {
      state.mess = action.payload;
    },
    roomsAdd(state, action:PayloadAction<Array<IRoom>>) {
      state.rooms = action.payload;
    },
    roomAdd(state, action:PayloadAction<IRoom>) {
      state.room = action.payload;
    },
  },
})

export const {setAuth, setMess, roomsAdd, roomAdd } = appSlice.actions

export const getAuthSelector = (state: RootState) => state.app.auth;
export const getMessSelector = (state: RootState) => state.app.mess
export const getRoomsSelector = (state: RootState) => state.app.rooms
export const getRoomSelector = (state: RootState) => state.app.room

export default appSlice.reducer