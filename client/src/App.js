import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'routes';

import store from './store';
import { loadUser } from './actions/auth';

import { Notice } from 'screen';
import { Header, Footer, Post } from 'components';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {routes.map(route => (
        <Route
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}
      <Switch>
        <Route path='/notice/:id' component={Post} />
        <Route path='/notice' component={Notice} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
