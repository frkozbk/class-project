import { GET_USER_CLASS, GET_ERRORS } from './types'


import instance from '../instance'
export const getUserClass = user => dispatch => {
  instance
    .get("/api/users/getuserclass")
    .then(response => {
      dispatch({
        type: GET_USER_CLASS,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    });
};
