import {createSlice} from "@reduxjs/toolkit";
import {FilterEnum} from "../assets/filter-enum.ts";
import {StateToDoList} from "../type/state-todolist.ts";

const initialState: StateToDoList = {
    isSelectingDelete: false,
    filter: FilterEnum.none,
}

export const stateTodolistSlice = createSlice({
    name:'stateToDoList',
    initialState,
    reducers: {
        toggleIsSelectingDelete: (state)=> {
            state.isSelectingDelete = !state.isSelectingDelete;
        },
        changeFilter: (state, {payload}:{payload:string} )=> {
            state.filter = payload;
        },
    },
})

export const {actions, reducer} = stateTodolistSlice

