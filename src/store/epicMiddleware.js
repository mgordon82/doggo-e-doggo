import { ajax } from 'rxjs/ajax';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = (store) => {
	const originalEpicMiddleware = createEpicMiddleware({
		dependencies: {
			ajax,
			dispatch: store.dispatch
		}
	});

	const storeMiddleware = originalEpicMiddleware(store);

	epicMiddleware.run = originalEpicMiddleware.run;

	return storeMiddleware;
};

export default epicMiddleware;
