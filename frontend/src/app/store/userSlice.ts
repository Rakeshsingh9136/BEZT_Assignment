import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User type
interface User {
  id: number; // or string, depending on your data type
  username: string; // add any other user properties as needed
}

// Define the initial state type
type UserState = User[];

const initialState: UserState = [];

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => action.payload,
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
