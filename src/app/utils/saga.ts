import { take, takeEvery,  call, put  } from 'redux-saga/effects';
import { registration, enter, roomAdded, setAuth, setMess, checkIn } from '@/app/utils/appSlice'
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import { runTransaction, writeBatch, collection, getDocs, doc, getDoc  } from "firebase/firestore";
import {auth, db} from '@/app/utils/firestore' 
import { DocumentReference } from 'firebase/firestore/lite';
import { IGetRooms } from '@/app/utils/constants'


let errorMessReg = ''


export function* rootSaga() {
  yield watchClickSaga();
}

function* watchClickSaga() {
  yield takeEvery(registration, workRegistration);
  yield takeEvery(enter, workEnter);
  yield takeEvery(checkIn, workCheckIn)
}

function* workRegistration(action: any) {
  const { username, password } = action.payload;
  let ok: boolean = yield call(createNewAccount, username, password);
  if (ok) {
    let temp: {} = {};
    temp = yield getRooms();
    yield put(roomAdded(temp));
    yield put(setAuth());
    yield put(setMess(""));
  } else yield put(setMess(errorMessReg));
}

function* workEnter(action: any) {
  const { username, password } = action.payload;
  const ok: boolean = yield call(signIn, username, password);
  if (ok) {
    let temp: {} = {};
    temp = yield getRooms();
    yield put(roomAdded(temp));
    yield put(setAuth());
    yield put(setMess(""));
  } else yield put(setMess("Invalid email or password."));
}

function* workCheckIn(action: {payload:{room:number, checkIn:string, checkOut:string}}) {
  const { room, checkIn, checkOut } = action.payload;
  console.log(action.payload);
  
  yield updateCheckIn(room, checkIn, checkOut)

  const temp:IGetRooms[] = yield getRooms();

  yield put(roomAdded(temp));
}

async function updateCheckIn(room:number, dateCheckIn:string, dateCheckOut:string) {
  const batch = writeBatch(db);
  let temp: IGetRooms = {
    room: 0,
    //status: false,
    info: '',
    checkIn: '',
    checkOut: ''
  };
  let sfDocRef: DocumentReference 
  const querySnapshot = await getDocs(collection(db, "rooms"));
  console.log(room, dateCheckIn, dateCheckOut);
  
  querySnapshot.forEach((doc) => {
    temp = <IGetRooms>doc.data();
    
      if(temp.room == room) {
        sfDocRef = <DocumentReference>doc.ref
        return
      }     
    });

  try {
    const newStatus = await runTransaction(db, async (transaction) => {
      const sfDoc:any = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      console.log(sfDoc.data());
      transaction.update(sfDocRef, { checkIn: dateCheckIn, checkOut: dateCheckOut});
    });
  } catch (e) {
    console.error(e);
  }
}

async function signIn(username: string, password: string) {
  let result: boolean = false;
  await signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      result = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      result = false;
    });
  return result;
}

async function createNewAccount(username: string, password: string) {
  let result: boolean = false;
  await createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      result = true;
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        errorMessReg = "This email address already exists!";
      } else {
        errorMessReg = "Invalid email or password!";
      }
      console.log(errorCode, errorMessage);

      result = false;
    });
  return result;
}

async function getRooms() {
  let temp: Array<IGetRooms> = [];
  const querySnapshot = await getDocs(collection(db, "rooms"));
  querySnapshot.forEach((doc) => {
    temp.push(<IGetRooms>doc.data());
  });
  return temp;
}
