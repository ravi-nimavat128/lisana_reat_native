import {applyMiddleware, combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import UserReducer from '../Reducer/UserReducer/UserReducer';
import DateReducer from '../Reducer/DateReducer/DateReducer';
import {persistStore, persistReducer} from 'redux-persist';

const rootreducer = combineReducers({
  userDetails: UserReducer,
  dateDetails: DateReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails'],
};
const persistedReducer = persistReducer(
  persistConfig,
  rootreducer,
  applyMiddleware(),
);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};

// export default store = createStore(rootreducer, applyMiddleware(thunk));
