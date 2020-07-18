import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { usersSlice } from './reducers/users';

const rootReducer = combineReducers({
  users: usersSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
