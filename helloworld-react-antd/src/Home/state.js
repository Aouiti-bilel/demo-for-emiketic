import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Activity from '../Shared/Activity';

/**
 * Module name
 */

export const MODULE = 'Home';

/**
 * Initial state
 */

const defineInitialState = () => ({
  tasks: null,
  profiles: [],
  products: [], 
  product: null
});

/**
 * Reset
 */

export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Fetch tasks
 */

// Promise implementation
const $fetchTasksPromise = StateHelper.createAsyncOperation(MODULE, 'fetchTasks', () => {
  return (dispatch) => {
    Activity.processing(MODULE, $fetchTasksPromise.NAME);
    dispatch($fetchTasksPromise.request());

    return fetch(`${API_ENDPOINT}/client/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($fetchTasksPromise.success(result)))
      .catch((error) => dispatch($fetchTasksPromise.failure(error)))
      .finally(() => Activity.done(MODULE, $fetchTasksPromise.NAME));
  };
});

// async/await implementation
export const $fetchTasks = StateHelper.createAsyncOperation(MODULE, 'fetchTasks', () => {
  return async (dispatch) => {
    Activity.processing(MODULE, $fetchTasks.NAME);
    dispatch($fetchTasks.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/client/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch($fetchTasks.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch($fetchTasks.failure(error));
    } finally {
      Activity.done(MODULE, $fetchTasks.NAME);
    }
  };
});
// async/await implementation
export const $fetchProfilesAndProducts = StateHelper.createAsyncOperation(MODULE, 'fetchProfilesAndProducts', () => {
  return async (dispatch) => {
    Activity.processing(MODULE, $fetchProfilesAndProducts.NAME);
    dispatch($fetchProfilesAndProducts.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/profile/all`, {
        headers: {
          Authorization: `${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch($fetchProfilesAndProducts.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch($fetchProfilesAndProducts.failure(error));
    } finally {
      Activity.done(MODULE, $fetchProfilesAndProducts.NAME);
    }
  };
});
// async/await implementation
export const $getProduct = StateHelper.createAsyncOperation(MODULE, 'getProduct', ( ID, data) => {
  return async (dispatch) => {
    Activity.processing(MODULE, $getProduct.NAME);
    dispatch($getProduct.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/products/product/${ID}`, {
        headers: {
          Authorization: `${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch($getProduct.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch($getProduct.failure(error));
    } finally {
      Activity.done(MODULE, $getProduct.NAME);
    }
  };
});
/**
 * Create task
 */

export const $createTask = StateHelper.createAsyncOperation(MODULE, 'createTask', (data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $createTask.NAME);
    dispatch($createTask.request());

    return fetch(`${API_ENDPOINT}/client/task/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($createTask.success(result)))
      .catch((error) => dispatch($createTask.failure(error)))
      .finally(() => Activity.done(MODULE, $createTask.NAME));
  };
});

/**
 * Update task
 */

export const $addLike = StateHelper.createAsyncOperation(MODULE, 'addLike', (id, data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $addLike.NAME);
    dispatch($addLike.request());

    return fetch(`${API_ENDPOINT}/products/product/like/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($addLike.success(result)))
      .catch((error) => dispatch($addLike.failure(error)))
      .finally(() => Activity.done(MODULE, $addLike.NAME));
  };
});
/**
 * Update task
 */

export const $removeLike = StateHelper.createAsyncOperation(MODULE, 'removeLike', (id, data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $removeLike.NAME);
    dispatch($removeLike.request());

    return fetch(`${API_ENDPOINT}/products/product/unlike/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($removeLike.success(result)))
      .catch((error) => dispatch($removeLike.failure(error)))
      .finally(() => Activity.done(MODULE, $removeLike.NAME));
  };
});


/**
 * Remove task
 */

export const $removeTask = StateHelper.createAsyncOperation(MODULE, 'removeTask', (taskId) => {
  return (dispatch) => {
    Activity.processing(MODULE, $removeTask.NAME);
    dispatch($removeTask.request());

    return fetch(`${API_ENDPOINT}/client/task/${taskId}/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(() => dispatch($fetchTasks()))
      .catch((error) => dispatch($removeTask.failure(error)))
      .finally(() => Activity.done(MODULE, $removeTask.NAME));
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return defineInitialState();
    case $fetchTasks.REQUEST:
      return {
        ...state,
        tasks: null,
        profiles: [],
        products: []
      };
    case $fetchTasks.SUCCESS:
    case $fetchProfilesAndProducts.SUCCESS: 
      return {
        ...state,
        tasks: action.type,
        profiles: action.data.profiles,
        products: action.data.products
      };
    case $getProduct.SUCCESS: 
      return {
        ...state,
        product: action.data
      }
    
    case $addLike.SUCCESS: 
    case $removeLike.SUCCESS:
      return {
        ...state,
        product: {...state.product, likes: action.likes}
      };
   
    case $fetchTasks.FAILURE:
      return {
        ...state,
        tasks: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ tasks, profiles, products }) {
  return {
    tasks,
    profiles,
    products
  };
}
