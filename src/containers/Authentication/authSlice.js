import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    logoutFailed: (state, action) => {
      state.isAuthenticated = true;
      state.error = action.payload;
    }
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed
} = authSlice.actions;

export default authSlice.reducer;
