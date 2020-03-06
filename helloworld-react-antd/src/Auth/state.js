import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import * as Activity from '../Shared/Activity';

import { AuthService } from './Auth.service';

/**
 * Module name
 */

export const MODULE = 'Auth';

/**
 * Initial state
 */

const defineInitialState = () => ({
  authenticated: false,
  user: null,
  profile:null
});

/**
 * Reset
 */

export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Login
 */

export const $login = StateHelper.createAsyncOperation(MODULE, 'login', (username, password) => {
  return (dispatch) => {
    Activity.processing(MODULE, $login.NAME);
    dispatch($login.request());

    return AuthService.login(username, password)
      .then((result) => dispatch($login.success(result)))
      .catch((error) => dispatch($login.failure(error)))
      .finally(() => Activity.done(MODULE, $login.NAME));
  };
});

/**
 * Logout
 */

export const $logout = StateHelper.createSimpleOperation(MODULE, 'logout', () => {
  return (dispatch) => {
    dispatch($logout.action());
    return AuthService.logout();
  };
});

/**
 * Signup
 */

export const $signup = StateHelper.createAsyncOperation(MODULE, 'signup', (payload) => {
  return async (dispatch) => {
    Activity.processing(MODULE, $signup.NAME);
    dispatch($signup.request());

    return AuthService.signup(payload)
      .then((result) => dispatch($signup.success(result)))
      .catch((error) => dispatch($signup.failure(error)))
      .finally(() => Activity.done(MODULE, $signup.NAME));
  };
});

/**
 * Initiate password reset
 */

export const $initiatePasswordReset = StateHelper.createAsyncOperation(MODULE, 'initiatePasswordReset', (email) => {
  return (dispatch) => {
    Activity.processing(MODULE, $initiatePasswordReset.NAME);
    dispatch($initiatePasswordReset.request());

    return AuthService.initiatePasswordReset(email)
      .then((result) => dispatch($initiatePasswordReset.success(result)))
      .catch((error) => dispatch($initiatePasswordReset.failure(error)))
      .finally(() => Activity.done(MODULE, $initiatePasswordReset.NAME));
  };
});

/**
 * Fetch profile
 */

export const $fetchProfile = StateHelper.createAsyncOperation(MODULE, 'fetchProfile', () => {
  return (dispatch) => {
    Activity.processing(MODULE, $fetchProfile.NAME);
    dispatch($fetchProfile.request());
    return fetch(`${API_ENDPOINT}/profile/current/company`, {
      headers: {
        Authorization: `${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($fetchProfile.success(result)))
      .catch((error) => dispatch($fetchProfile.failure(error)))
      .finally(() => Activity.done(MODULE, $fetchProfile.NAME));
  };
});
export const $createProfile = StateHelper.createAsyncOperation(MODULE, 'createProfile', (data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $createProfile.NAME);
    dispatch($createProfile.request());
    return fetch(`${API_ENDPOINT}/profile/add/company`, {
      method: 'POST',
      headers: {
        Authorization: `${AuthService.getAccessToken()}`,
      },
      body: data
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($createProfile.success(result)))
      .catch((error) => dispatch($createProfile.failure(error)))
      .finally(() => Activity.done(MODULE, $createProfile.NAME));
  };
});

/**
 * Reducer
 */
export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return defineInitialState();
    case $login.REQUEST:
      return {
        ...state,
        user: null,
      };
    case $login.SUCCESS:
    case $signup.SUCCESS:
      const initials = action.user.name
        .split(/\W+/)
        .map((w) => w[0] || '')
        .join('')
        .toUpperCase();
      return {
        ...state,
        authenticated: true,
        user: {
          ...action.user,
          initials,
        }
      };
      case $fetchProfile.SUCCESS:
      case $createProfile.SUCCESS:  
        return {
          ...state,
          profile:action.profile
        };
      case $logout.ACTION:
        return {
          ...state,
          authenticated: false,
          user: null,
        };
    default:
      return state;
  }
}
/**
 * Persister
 */
export function persister({ authenticated, user, profile }) {
  return {
    authenticated,
    user,
    profile
  };
}
