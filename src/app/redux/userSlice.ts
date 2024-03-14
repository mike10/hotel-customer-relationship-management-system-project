import { createSlice } from '@reduxjs/toolkit'

const initialState: [{
    id: number,
    text: string,
    completed: boolean
  } ]= [{id : 0, text: '', completed: false}]
  


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      })
    },
    
  },
})

export const { userAdded, } = userSlice.actions
export default userSlice.reducer