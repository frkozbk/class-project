import { GET_USER_CLASS } from '../actions/types';

const initialState = {
  classes: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CLASS:
      return {
        ...state,
        classes: action.payload
      };
    default:
      return state;
  }
};
