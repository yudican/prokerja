import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../../Utils/contstans';
import {customFetchBaseQuery} from '../../../Utils/helpers';

export const jobService = createApi({
  reducerPath: 'jobService',
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['jobAll', 'jobDetail', 'applyHistory', 'jobApplyTest'],
  endpoints: builder => ({
    getJob: builder.query({
      query: params => `/jobs/all`,
      providesTags: ['jobAll'],
    }),
    getJobDetail: builder.query({
      query: params => `/jobs/detail/${params}`,
      providesTags: ['jobDetail'],
    }),

    applyHistory: builder.query({
      query: params => `/jobs/apply/history`,
      providesTags: ['applyHistory'],
    }),

    // aplly
    apply: builder.mutation({
      query: body => ({
        url: '/jobs/apply',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
        },
      }),
      invalidatesTags: ['jobAll', 'jobDetail', 'applyHistory'],
    }),
    applyTest: builder.mutation({
      query: body => ({
        url: '/jobs/apply/test',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data', // Set the Content-Type header to multipart/form-data
        },
      }),
      invalidatesTags: ['jobAll', 'jobDetail', 'applyHistory'],
    }),
    // Add other endpoints here if needed
  }),
});

export const {
  useGetJobQuery,
  useGetJobDetailQuery,
  useApplyHistoryQuery,
  useApplyMutation,
  useApplyTestMutation,
} = jobService;
