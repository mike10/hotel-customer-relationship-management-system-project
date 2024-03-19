import { configureStore } from '@reduxjs/toolkit'
import appReducer from '@/app/redux/appSlice';
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { take, takeEvery,  call, put  } from 'redux-saga/effects';
import { registration, enter, roomAdded, setAuth, setMess } from '@/app/redux/appSlice'
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc  } from "firebase/firestore";

import { message } from 'antd';
const saga = createSagaMiddleware()

const firebaseConfig = {
  apiKey: "AIzaSyDUiAodSQPNH8r0s6F3BfaMS-b1zX1LKUI",
  authDomain: "finance-blog-f38f2.firebaseapp.com",
  databaseURL: "https://finance-blog-f38f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finance-blog-f38f2",
  storageBucket: "finance-blog-f38f2.appspot.com",
  messagingSenderId: "140148358827",
  appId: "1:140148358827:web:99183db5674ede654981ee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
})

saga.run(rootSaga)

function* rootSaga(){
  yield watchClickSaga()
}

function* watchClickSaga(){
  yield takeEvery(registration, workRegistration);
  yield takeEvery(enter, workEnter)
}

function* workRegistration(action:any){
  const {username, password } = action.payload        
  let ok:boolean = yield createNewAccount(username, password)
  let temp:{} = {}
  //if(!ok) {
    temp = yield getRooms()
    yield put(roomAdded(temp))
  //} else console.log('Error');
  console.log(temp, ok);
}
function* workEnter(action:any){
  const {username, password } = action.payload 
  const ok:boolean = yield call(signIn, username, password)
  if (ok) {
    let temp:{} = {}
    temp = yield getRooms()
    yield put(roomAdded(temp))
    yield put(setAuth())
    yield put(setMess(''))
  }else yield put(setMess('Invalid email or password.'))
  
}

async function signIn(username:string, password:string) {
  let result:boolean = false
  await signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    const user = userCredential.user;
    
    result = true

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //console.log('signIn', errorCode);
    result = false
  });
  return result
}

function createNewAccount(username:string, password:string): boolean{
  createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return true 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('createNewAccount', errorCode, errorMessage);
    
  });
   
}

async function getRooms(){
  const docRef = doc(db, "hotel", "rooms");
  const docSnap = await getDoc(docRef);
  let temp:Array<object> = [{}]

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    //temp = docSnap.data()
    temp = Object.entries(docSnap.data())
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  console.log(temp);
  return temp;
   
}



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch