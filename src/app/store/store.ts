import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/app/store/slice/userSlice';
import roomReducer from '@/app/store/slice/roomSlice';
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
const saga = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
})

saga.run(postSaga)

function* postSaga(){
    console.log('hay');
    
    /*const users = yield call()
    yield put(setPost())*/
}

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch