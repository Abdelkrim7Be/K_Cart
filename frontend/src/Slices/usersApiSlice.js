import { USERS_URL } from "../constants";
import { apiSlice } from "../Slices/apiSlice"; //Like the parent

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // we are basically gonna send data to the auth endpoint
        url: USERS_URL / auth,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSliceApiSlice;
