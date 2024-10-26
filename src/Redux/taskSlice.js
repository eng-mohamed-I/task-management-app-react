import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  status: "idle",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editState: (state, action) => {
      const { id, updatedState } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        console.log(state.tasks[index].state);

        state.tasks[index].state = updatedState;
      }
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, editTask, deleteTask, editState } = taskSlice.actions;
export default taskSlice.reducer;
