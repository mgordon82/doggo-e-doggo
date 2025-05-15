import { combineEpics } from 'redux-observable';
import authEpic from '../containers/Authentication/authEpic';
import getBreedsEpic from '../containers/Breeds/breedsEpic';
import getAvailableDogs from '../containers/Dogs/dogsEpic';

const rootEpic = combineEpics(
  ...authEpic,
  ...getBreedsEpic,
  ...getAvailableDogs
);

export default rootEpic;
