import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "../actions/types";

// Register User
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login User
export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      // Token ı al

      const token = res.data.token;
      // Token ı local a kayıt et
      localStorage.setItem("jwtToken", token);
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
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
