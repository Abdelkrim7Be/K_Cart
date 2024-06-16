import { PRODUCTS_URL } from "../constants";
import { SINGLE_PRODUCT_URL } from "../constants";
import { apiSlice } from "../Slices/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, //in seconds (in GET methods, not in POST ones)
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
