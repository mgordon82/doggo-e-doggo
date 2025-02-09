import { combineEpics } from 'redux-observable';
import authEpic from '../containers/Authentication/authEpic';

const rootEpic = combineEpics(...authEpic);

export default rootEpic;
