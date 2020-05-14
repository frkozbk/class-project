import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import instance from '../instance';

// Register User
export const registerUser = (newUser, history) => dispatch => {
  instance
    .post('/api/users/register', newUser)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login User
export const loginUser = user => dispatch => {
  instance
    .post('/api/users/login', user)
    .then(res => {
      // Token ı al

      const { token } = res.data;
      // Token ı local a kayıt et
      localStorage.setItem('jwtToken', token);
      // token ı axios'un headerına kayıt et
      setAuthToken(token);
      // Kullanıcının bilgisini almak için token ı ayrıştır
      const decoded = jwt_decode(token);
      // User ı React store a koy
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// KULLANICIYI REACT STORE'A KAYIT ET
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// Kullanıcıyı logout yaptıktan sonra token ı gönderilecek olan isteklerin
// headerından kaldır
export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history && history.push('/login');
};
