import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "../Slices/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, //in seconds
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
