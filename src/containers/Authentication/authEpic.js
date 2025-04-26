import axios from '../../utilities/axios';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { primaryRestGateway } from '../../utilities/apiEndpointUtility';
import {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed
} from './authSlice';

const authEpic = (action$) =>
  action$.pipe(
    ofType('auth/loginRequest'),
    mergeMap(async (action) => {
      const { name, email } = action.payload;
      const response = await axios.post(`${primaryRestGateway()}/auth/login`, {
        name,
        email
      });
      if (response.data === 'OK') {
        sessionStorage.setItem('access-token', true);

        return true;
      }
      return false;
    }),
    switchMap((res) => [loginSuccess(res)]),
    catchError((error) => {
      return of(loginFailed(error.message));
    })
  );

const logoutEpic = (action$) =>
  action$.pipe(
    ofType('auth/logout'),
    mergeMap(async () => {
      sessionStorage.removeItem('access-token');
      const response = await axios.post(`${primaryRestGateway()}/auth/logout`);
      if (response.data === 'OK') {
        return true;
      }
      return false;
    }),
    switchMap((res) => [logoutSuccess(res)]),
    catchError((error) => {
      return of(logoutFailed(error.message));
    })
  );

const epics = [authEpic, logoutEpic];

export default epics;
