/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import {LocalizationProvider} from '@mui/x-date-pickers';
// views without layouts



ReactDOM.render(
  <BrowserRouter>
      <Switch>
      <Route path="/app" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Auth} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
