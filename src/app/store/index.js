import {  applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'path-to-your-rootReducer';
import middleware from './middleware';
import { rootReducer } from '.';
import createSagaMiddleware from 'redux-saga';

const saga = createSagaMiddleware();


export default createStore(rootReducer, composeWithDevTools(applyMiddleware(middleware)));
const store = configureStore({
    reducer: {
        user: userReducer,
        rooms: roomsReducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(saga)
    }
})



/*export const rootReducer = combineReducers({rooms: roomsReducer,users: usersReducer,});

const sagasList = [usersSaga,roomsSaga,];

export default function* watchRootSaga() {yield all(sagasList.map((saga) => call(saga)))}
*/