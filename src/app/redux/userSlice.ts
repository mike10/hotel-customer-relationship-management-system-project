import { createSlice } from '@reduxjs/toolkit'

const initialState: {
    rooms: Array<Array<string>>,
 } = {rooms:[]}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registration(state, action) {},
    enter(state, action) {},
    userAdded() {},
    roomAdded(state, action) {
      console.log('roomAdded',action.payload);
      
      state.rooms = action.payload;
    },
  },
})

export const { userAdded, roomAdded, registration, enter } = userSlice.actions
export default userSlice.reducer