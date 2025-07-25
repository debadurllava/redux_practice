import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: [],
}

//RTK Slice

export const taskReducer = createSlice({
    name:'task',
    initialState,
    reducers:{
        addTask(state,action){
            state.task.push(action.payload);
        },
        deleteTask(state,action){
            state.task = state.task.filter((currEle, index) =>{
              return index !== action.payload
            })
        }
    }
})

console.log(taskReducer)

