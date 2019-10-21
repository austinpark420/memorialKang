import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'routes';

import store from './store';
import { loadUser } from './actions/auth';

import { Notice, Images } from 'screen';
import { Header, Footer, Post, NewPost, EditPost, Image } from 'components';
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
        <Route path='/notices/reWrite' component={EditPost} />
        <Route path='/notices/write' component={NewPost} />
        <Route path='/notices/:id' component={Post} />
        <Route path='/notices' component={Notice} />
      </Switch>
      <Switch>
        <Route path='/images/:id' component={Image} />
        <Route path='/images' component={Images} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
