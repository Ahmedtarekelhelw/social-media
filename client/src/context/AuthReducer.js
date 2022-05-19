import {
  FOLLOW_FAILURE,
  FOLLOW_START,
  FOLLOW_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  UNFOLLOW_SUCCESS,
} from "./Actions";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case FOLLOW_START:
      return {
        ...state,
        isFetching: true,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
        isFetching: false,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          following: [
            ...state.user.following.filter((id) => id !== action.payload),
          ],
        },
        isFetching: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: localStorage.clear(),
        isFetching: false,
      };
    case FOLLOW_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
