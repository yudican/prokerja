// store.js
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import generalReducer from './Reducers/generalReducer';
import {pokemonService} from './Services/pokemonService';
import {authService} from './Services/authService';
import userReducer from './Reducers/userReducer';
import {visitService} from './Services/visitService';
import {profileService} from './Services/profileService';
import {courseService} from './Services/courseService';
import {jobService} from './Services/jobService';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
    // Add your other reducers here if you have any
    [pokemonService.reducerPath]: pokemonService.reducer,
    [authService.reducerPath]: authService.reducer,
    [visitService.reducerPath]: visitService.reducer,
    [courseService.reducerPath]: courseService.reducer,
    [jobService.reducerPath]: jobService.reducer,
    [profileService.reducerPath]: profileService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      pokemonService.middleware,
      authService.middleware,
      visitService.middleware,
      courseService.middleware,
      jobService.middleware,
      profileService.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
