import React from 'react';
import { Switch, Route as ReactRoute } from 'react-router-dom';

import Leads from '../pages/Leads';
import Brokers from '../pages/Brokers';

const LoggedRoutes: React.FC = () => {
  return (
    <Switch>
      <ReactRoute path="/leads">
        <Leads />
      </ReactRoute>

      <ReactRoute path="/corretores">
        <Brokers />
      </ReactRoute>
    </Switch>
  );
};

export default LoggedRoutes;
