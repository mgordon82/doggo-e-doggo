import axios from '../../utilities/axios';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { primaryRestGateway } from '../../utilities/apiEndpointUtility';

import { getBreedsFailed, getBreedsSuccess } from './breedsSlice';

const getBreedsEpic = (action$) =>
  action$.pipe(
    ofType('breeds/getBreeds'),
    mergeMap(async () => {
      const response = await axios.get(`${primaryRestGateway()}/dogs/breeds`);
      return response;
    }),
    switchMap((res) => [getBreedsSuccess(res.data)]),
    catchError((error) => {
      return of(getBreedsFailed(error.message));
    })
  );

const epics = [getBreedsEpic];

export default epics;
