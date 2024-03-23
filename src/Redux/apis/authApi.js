import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: body => {
        return {
          url: 'api/users/admin/login',
          method: 'post',
          headers: { client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET },
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
