import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../../Utils/contstans';
import {customFetchBaseQuery} from '../../../Utils/helpers';

export const courseService = createApi({
  reducerPath: 'courseService',
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['courseAll', 'courseDetail'],
  endpoints: builder => ({
    getCourse: builder.query({
      query: params => `/courses/all`,
      providesTags: ['courseAll'],
    }),
    getCourseDetail: builder.query({
      query: params => `/courses/detail/${params}`,
      providesTags: ['courseDetail'],
    }),
    // Add other endpoints here if needed
  }),
});

export const {useGetCourseQuery, useGetCourseDetailQuery} = courseService;
