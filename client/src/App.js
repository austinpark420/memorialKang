import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'routes';

import store from './store';
import { loadUser } from './actions/auth';

import { Notice, Emergency, Images, Document } from 'screen';
import {
  Header,
  Footer,
  Post,
  NewPost,
  EditPost,
  Image,
  Alert
} from 'components';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <Alert />
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
        <Route path='/emergencies/reWrite' component={EditPost} />
        <Route path='/emergencies/write' component={NewPost} />
        <Route path='/emergencies/:id' component={Post} />
        <Route path='/emergencies' component={Emergency} />
      </Switch>
      <Switch>
        <Route path='/documents/reWrite' component={EditPost} />
        <Route path='/documents/write' component={NewPost} />
        <Route path='/documents/:id' component={Post} />
        <Route path='/documents' component={Document} />
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
