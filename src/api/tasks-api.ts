import {api} from "./api.ts";
import {Task} from "../type/task.ts";

const header = {
    'Content-Type': 'application/json;charset=utf-8'
}
export const tasksApi = api.injectEndpoints({
    endpoints: build => ({
        getTasks: build.query({
            query: () => '/ToDoList/Tasks',
        }),
        addTask:build.mutation({
            query: (task:Task) => ({
                body: task,
                url:'/',
                method:"POST",
                mode: "cors",
                headers: header,
            }),
            invalidatesTags: ()=>[{
                type: 'Tasks'
            }]
        }),
        deleteTask:build.mutation({
            query: (idTasks: Array<string>) => ({
                body: idTasks,
                url:'/',
                method:"DELETE",
                mode: "cors",
                headers: header,
            }),
            invalidatesTags: ()=>[{
                type: 'Tasks'
            }]
        }),
        updateTask:build.mutation({
            query: (task:Task) => ({
                body: task,
                url:'/',
                method:"PUT",
                mode: "cors",
                headers: header,
            }),
            invalidatesTags: ()=>[{
                type: 'Tasks'
            }]
        }),
    })
})

export const { useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi;