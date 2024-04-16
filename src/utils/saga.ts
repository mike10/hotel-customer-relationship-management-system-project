import { takeEvery,  call, put  } from 'redux-saga/effects';
import { roomAdd, roomsAdd, setAuth, setMess } from '@/utils/appSlice'
import { createNewAccount, getRoom, getRooms, signIn, updateCheckIn} from '@/utils/firestore' 
import { IAuth, IRoom } from '@/utils/constants'


export function* rootSaga() {
  yield watchClickSaga();
}

function* watchClickSaga() {
  yield takeEvery('REGISTRATION', workRegistration);
  yield takeEvery('ENTER', workEnter);
  yield takeEvery('AUTH', workAuth);
  yield takeEvery('CHECK_IN', workCheckIn);
  yield takeEvery('GET_ROOM', workGetRoom);
  
}

function* workRegistration(action: {type:string, payload:IAuth}) {
  const { username, password } = action.payload;
  
  let ok: boolean = yield call(createNewAccount, username, password);
  if (ok) {
    let temp: IRoom[] = [];
    temp = yield getRooms();
    yield put(roomsAdd(temp));
    yield put(setAuth());
  } else yield put(setMess('registration failed'));
}

function* workEnter(action: {type:string, payload:IAuth}) {
  const { username, password } = action.payload;
  const ok: boolean = yield call(signIn, username, password);
   if (ok) {
    let temp: IRoom[] = [];
    temp = yield getRooms();
    yield put(roomsAdd(temp));
    yield put(setAuth());
  } else yield put(setMess("Invalid email or password.")); 
}

function* workAuth() {
  let temp: IRoom[] = [];
  temp = yield getRooms();
  yield put(roomsAdd(temp));
  yield put(setAuth());
}

function* workCheckIn(action: {type:string, payload:{room:number, checkIn:string, checkOut:string}}) {
  const { room, checkIn, checkOut } = action.payload;
  yield updateCheckIn(room, checkIn, checkOut)
  const temp:IRoom[] = yield getRooms();
  yield put(roomsAdd(temp));
}

function* workGetRoom(action:{type:string, payload:number}) {
  const room:IRoom = yield getRoom(action.payload)
  yield put(roomAdd(room))
}





