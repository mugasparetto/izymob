import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import LoggedArea from '../pages/LoggedArea';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/:id" component={LoggedArea} isPrivate />
    </Switch>
  );
};

export default Routes;
