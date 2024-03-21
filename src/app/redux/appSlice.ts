import { createSlice } from '@reduxjs/toolkit'
interface IGetRooms {
  room:number, 
  status:boolean, 
  info:string
}
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
    userAdded() {},
    roomAdded(state, action) {
      //console.log('roomAdded',action.payload);
      state.rooms = action.payload;
    },
  },
})

export const { userAdded, roomAdded, registration, enter, setAuth, setMess } = appSlice.actions
export default appSlice.reducer