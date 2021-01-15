import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-json-inspector/json-inspector.css";

import { Switch, Route, HashRouter } from "react-router-dom";
import Login from "./pages/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setCurrentUser, logout } from "./redux/actions/userActions";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import axios from "axios";
import Messages from "./components/common/Messages";
import { toastr } from "react-redux-toastr";
import FichaConsult from "./pages/Consult/FichaConsult";

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const decoded = jwtDecode(token);

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
  store.dispatch(setCurrentUser(decoded));
}

axios.defaults.baseURL = "https://nanapodo.herokuapp.com/api/";
//process.env.NODE_ENV === "development"
//? "http://localhost:3001/api"
//: "https://nanapodo.herokuapp.com/api/";
// process.env.REACT_APP_DEV_API_URL;
// 'http://3.129.92.92:3001/api';
//https://podo-backend.herokuapp.com/api/
//|| 'http://localhost:3001/api'

axios.interceptors.request.use(
  (config) => {
    if (!config.url.endsWith("/login")) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toastr.error("Sessão expirada faça login novamente");
      store.dispatch(logout());
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Messages />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/inicio" component={DefaultLayout} />
            <Route path="/ficha/:id" component={FichaConsult} />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
