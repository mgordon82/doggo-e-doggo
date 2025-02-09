import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import store from './store';
import Theme from './components/Theme';

const App = () => {
  return (
    <Provider store={store}>
      <Theme>
        <Router />
      </Theme>
    </Provider>
  );
};

export default App;
