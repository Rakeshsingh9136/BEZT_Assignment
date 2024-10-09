import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
