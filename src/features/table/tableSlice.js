import { createSlice } from '@reduxjs/toolkit';


const initialState = {
        taskList:[],
        filteredList:[],
    };

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getTaskList:(state) => {
        const data = JSON.parse(localStorage.getItem('taskList'));
        state.taskList = data || [];
    },
    createTask: (state, {payload}) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.taskList.unshift(payload);
    },
    updateTask: (state, {payload}) => {
      const index = state.taskList.findIndex((item) => 
          item.id === payload.id
      )
      state.taskList[index].task = payload.task;
      localStorage.setItem('taskList',(JSON.stringify(state.taskList)));
    },
    deleteTask: (state, {payload}) => {
      const newTaskList = state.taskList.filter( item => item.id !== payload)
      localStorage.setItem('taskList',(JSON.stringify(newTaskList)));
      state.taskList = newTaskList;
    },
    filterTaskList:( state, {payload}) =>{
      const filteredList = state.taskList.filter( item => item.task.includes(payload.toLowerCase()))
      state.filteredList = filteredList;
    },
    setTaskList:( state, {payload}) =>{
      localStorage.setItem('taskList',(JSON.stringify(payload)));
      state.taskList = payload; 
    },
  },
});

export const { getTaskList, createTask, updateTask, deleteTask, filterTaskList, setTaskList } = tableSlice.actions;

export default tableSlice.reducer;
