import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Classroom from './components/dashboard/Classroom';
import ClassroomDashboard from './components/ClassroomDashboard';
// Token ı kontrol et
if (localStorage.jwtToken) {
  // Toker ı göndericeğimiz isteklerin headerına koy
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Kullanıcıyı login yap
  store.dispatch(setCurrentUser(decoded));

  // Token'ın süresi dolmuş mu kontrol et
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Eğer token'ın süresi dolmuşsa kullanıcıyı logout yap
    store.dispatch(logoutUser());

    // Login sayfasına git
    window.location.href = '/';
  }
}
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <PrivateRoute
            path="/classroom/:classroomID"
            component={ClassroomDashboard}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/classroom" component={Classroom} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
