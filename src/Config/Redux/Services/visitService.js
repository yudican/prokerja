import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../../Utils/contstans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customFetchBaseQuery} from '../../../Utils/helpers';

export const visitService = createApi({
  reducerPath: 'visitService',
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'token');
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', `multipart/form-data`);
      return headers;
    },
  }),
  tagTypes: ['visitList'],
  endpoints: builder => ({
    getVisit: builder.query({
      query: params => `/visits${params}`,
      providesTags: ['visitList'],
    }),
    createVisit: builder.mutation({
      query: body => ({
        url: '/visits',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['visitList'],
    }),
    // Add other endpoints here if needed
  }),
});

export const {useCreateVisitMutation, useGetVisitQuery} = visitService;
