import { configureStore } from '@reduxjs/toolkit'
import appReducer from '@/utils/appSlice';
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './saga';

const saga = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
})

saga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
