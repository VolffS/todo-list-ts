import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const baseUrl = "http://localhost:3000/api"


export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Tasks'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: build => ({
        getTasks: build.query({
            query: () => '/ToDoList/Tasks',
            providesTags: ()=>[{
                type: 'Tasks'
            }]
        }),
    })
})

export const { useGetTasksQuery } = api;