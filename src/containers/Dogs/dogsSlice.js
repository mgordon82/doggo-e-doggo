import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  availableDogIds: {
    data: [],
    hasCompleted: false,
    isLoading: false,
    error: null
  },
  dogsById: {
    data: [],
    hasCompleted: false,
    isLoading: false,
    error: null
  }
};

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    getAvailableDogs: (state) => {
      state.availableDogIds.isLoading = true;
      state.availableDogIds.error = null;
    },
    getAvailableDogsSuccess: (state, action) => {
      state.availableDogIds.isLoading = false;
      state.availableDogIds.hasCompleted = true;
      state.availableDogIds.data = action.payload;
    },
    getAvailableDogsFailed: (state, action) => {
      state.availableDogIds.isLoading = false;
      state.availableDogIds.data = [];
      state.availableDogIds.hasCompleted = false;
      state.availableDogIds.error = action.payload;
    },
    getDogsById: (state) => {
      state.dogsById.isLoading = true;
      state.dogsById.error = null;
    },
    getDogsByIdSuccess: (state, action) => {
      state.dogsById.isLoading = false;
      state.dogsById.hasCompleted = true;
      state.dogsById.data = action.payload;
    },
    getDogsByIdFailed: (state, action) => {
      state.dogsById.isLoading = false;
      state.dogsById.data = [];
      state.dogsById.hasCompleted = false;
      state.dogsById.error = action.payload;
    }
  }
});

export const {
  getAvailableDogs,
  getAvailableDogsSuccess,
  getAvailableDogsFailed,
  getDogsById,
  getDogsByIdSuccess,
  getDogsByIdFailed
} = dogsSlice.actions;

export default dogsSlice.reducer;
