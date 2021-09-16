import React from 'react';
import { Switch, Route as ReactRoute } from 'react-router-dom';

import Leads from '../pages/Leads';
import Brokers from '../pages/Brokers';

const LoggedRoutes: React.FC = () => {
  return (
    <Switch>
      <ReactRoute path="/leads" component={Leads} />
      <ReactRoute path="/corretores" component={Brokers} />
    </Switch>
  );
};

export default LoggedRoutes;
