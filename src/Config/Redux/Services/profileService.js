import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../../Utils/contstans';
import {customFetchBaseQuery} from '../../../Utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    notifications: builder.query({
      query: params => `/profile/notification`,
    }),
    updateProfile: builder.mutation({
      query: body => ({
        url: '/profile/update',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
        },
      }),
    }),

    updatePassword: builder.mutation({
      query: body => ({
        url: '/profile/update/password',
        method: 'POST',
        body,
      }),
    }),

    // Add other endpoints here if needed
  }),
});

export const {
  useNotificationsQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = profileService;
