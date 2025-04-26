import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import authenticationSlice from '../containers/Authentication/authSlice';
import breedsSlice from '../containers/Breeds/breedsSlice';

import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    auth: authenticationSlice,
    breeds: breedsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

export default store;
