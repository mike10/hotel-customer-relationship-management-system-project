import { createSlice } from '@reduxjs/toolkit'

const initialState: [{
    id: number,
    text: string,
    completed: boolean
  } ]= [{id : 0, text: '', completed: false}]
  


const roomSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    roomAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      })
    },
    
  },
})

export const { roomAdded, } = roomSlice.actions
export default roomSlice.reducer