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

export const LoginStart = () => ({
  type: LOGIN_START,
});
export const LoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};
export const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const FollowStart = () => ({
  type: FOLLOW_START,
});
export const Logout = () => ({
  type: LOGOUT,
});
export const FollowSuccess = (userId) => {
  return {
    type: FOLLOW_SUCCESS,
    payload: userId,
  };
};
export const UnfollowSuccess = (userId) => {
  return {
    type: UNFOLLOW_SUCCESS,
    payload: userId,
  };
};
export const FollowFailure = (error) => ({
  type: FOLLOW_FAILURE,
  payload: error,
});
