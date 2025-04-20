import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  hasCompleted: false,
  isLoading: false,
  error: null,
};

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    getBreeds: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getBreedsSuccess: (state, action) => {
      state.isLoading = false;
      state.hasCompleted = true;
      state.data = action.payload;
    },
    getBreedsFailed: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.hasCompleted = false;
      state.error = action.payload;
    },
  },
});

export const { getBreeds, getBreedsSuccess, getBreedsFailed } =
  breedsSlice.actions;

export default breedsSlice.reducer;
