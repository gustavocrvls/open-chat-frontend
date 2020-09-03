import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Logon from './pages/Logon';
import Chat from './pages/Chat';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/logon" exact component={Logon} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
};