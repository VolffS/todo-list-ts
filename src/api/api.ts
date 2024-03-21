import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api"


export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Tasks'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: () => ({})
})
