import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './AuthSlice';
import { authApi } from './apis/authApi';
import { mainApi } from './apis/mainApi';

const rootReducer = combineReducers({
  auth: persistReducer({ key: 'auth', storage }, authReducer),
  [authApi.reducerPath]: authApi.reducer,
  [mainApi.reducerPath]: mainApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, mainApi.middleware),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
