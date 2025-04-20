import { combineEpics } from 'redux-observable';
import authEpic from '../containers/Authentication/authEpic';
import getBreedsEpic from '../containers/Breeds/breedsEpic';

const rootEpic = combineEpics(...authEpic, ...getBreedsEpic);

export default rootEpic;
