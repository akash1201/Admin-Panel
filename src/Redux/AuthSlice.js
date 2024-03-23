import { createSlice } from '@reduxjs/toolkit';
// InitialState
let initialState = {
  user: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { updateUser } = AuthSlice.actions;
export default AuthSlice.reducer;
