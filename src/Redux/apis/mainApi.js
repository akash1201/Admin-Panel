import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: headers => {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      if (user && user?.token) {
        const token = user?.token;
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUsers: builder.mutation({
      query: body => {
        return {
          url: `api/dashboard/users?pageNo=${body?.pageNo || 1}&pageLimit=${
            body?.pageLimit || 20
          }`,
          method: 'get',
          headers: { client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET },
        };
      },
    }),
    getPosts: builder.mutation({
      query: body => {
        return {
          url: `api/dashboard/posts?pageNo=${body?.pageNo || 1}&pageLimit=${
            body?.pageLimit || 20
          }`,
          method: 'get',
          headers: { client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET },
        };
      },
    }),
    createPost: builder.mutation({
      query: body => {
        return {
          url: `api/users/post`,
          method: 'post',
          headers: { client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET },
          body,
        };
      },
    }),
    getPost: builder.mutation({
      query: body => {
        return {
          url: `api/users/post-details?id=${body?.id}`,
          method: 'get',
          headers: { client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET },
        };
      },
    }),
  }),
});

export const {
  useGetUsersMutation,
  useGetPostsMutation,
  useCreatePostMutation,
  useGetPostMutation,
} = mainApi;
