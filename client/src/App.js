import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { routes } from './routes';
import store from './store';
import { loadUser } from './actions/auth';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import {
  Notice,
  Emergency,
  Images,
  Award,
  Scholarship,
  MemorialHistories
} from './screen';
import {
  Header,
  Footer,
  Post,
  NewPost,
  EditPost,
  Image,
  MemorialHistory,
  Alert
} from './components';

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
        <Route path='/awards/reWrite' component={EditPost} />
        <Route path='/awards/write' component={NewPost} />
        <Route path='/awards/:id' component={Post} />
        <Route path='/awards' component={Award} />
      </Switch>
      <Switch>
        <Route path='/scholarships/reWrite' component={EditPost} />
        <Route path='/scholarships/write' component={NewPost} />
        <Route path='/scholarships/:id' component={Post} />
        <Route path='/scholarships' component={Scholarship} />
      </Switch>
      <Switch>
        <Route path='/images/:id' component={Image} />
        <Route path='/images' component={Images} />
      </Switch>
      <Switch>
        <Route path='/memorialHistories/:id' component={MemorialHistory} />
        <Route path='/memorialHistories' component={MemorialHistories} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
