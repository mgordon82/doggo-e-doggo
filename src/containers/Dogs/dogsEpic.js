import axios from '../../utilities/axios';
import qs from 'qs';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { primaryRestGateway } from '../../utilities/apiEndpointUtility';
import {
  getAvailableDogsFailed,
  getAvailableDogsSuccess,
  getDogsByIdFailed,
  getDogsByIdSuccess,
  getMatchingDogSuccess,
  getMatchingDogFailed
} from './dogsSlice';

const getAvailableDogsEpic = (action$) =>
  action$.pipe(
    ofType('dogs/getAvailableDogs'),
    mergeMap(async (action) => {
      const searchResponse = await axios.get(
        `${primaryRestGateway()}/dogs/search`,
        {
          params: action.payload,
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'brackets' })
        }
      );
      return searchResponse;
    }),
    switchMap((res) => [getAvailableDogsSuccess(res.data)]),
    catchError((error) => {
      return of(getAvailableDogsFailed(error.message));
    })
  );

const getDogsByIdEpic = (action$) =>
  action$.pipe(
    ofType('dogs/getDogsById'),
    mergeMap(async (action) => {
      const dogsResponse = await axios.post(
        `${primaryRestGateway()}/dogs`,
        action.payload
      );
      return dogsResponse;
    }),
    switchMap((res) => [getDogsByIdSuccess(res.data)]),
    catchError((error) => {
      return of(getDogsByIdFailed(error.message));
    })
  );

const getMatchingDog = (action$) =>
  action$.pipe(
    ofType('dogs/getMatchingDog'),
    mergeMap(async (action) => {
      const matchResponse = await axios.post(
        `${primaryRestGateway()}/dogs/match`,
        action.payload
      );
      return matchResponse;
    }),
    switchMap((res) => [getMatchingDogSuccess(res.data)]),
    catchError((error) => {
      return of(getMatchingDogFailed(error.message));
    })
  );

const epics = [getAvailableDogsEpic, getDogsByIdEpic, getMatchingDog];

export default epics;
