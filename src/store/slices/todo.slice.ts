import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoAPI } from "api";
import { EStatus, ITodo } from "types";

type InitialState = {
  status: EStatus;
  list: ITodo[];
};
const initialState: InitialState = {
  status: EStatus.init,
  list: [],
};

export const getTodoListAction = createAsyncThunk(
  "todo/getTodoListAction",
  async () => {
    const res = await TodoAPI.list();
    return res.data;
  }
);

export const deleteTodoAction = createAsyncThunk(
  "todo/deleteTodoAction",
  async (id: number) => {
    await TodoAPI.del(id);
    return id;
  }
);

export const updateTodoAction = createAsyncThunk(
  "todo/updateTodoAction",
  async (data: ITodo) => {
    await TodoAPI.changeStatus(data);
    return data.id;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodoListAction.pending, (state) => {
      state.status = EStatus.loading;
    });
    builder.addCase(getTodoListAction.rejected, (state) => {
      state.status = EStatus.error;
    });
    builder.addCase(getTodoListAction.fulfilled, (state, action) => {
      state.status = EStatus.success;
      state.list = action.payload;
    });
    builder.addCase(deleteTodoAction.fulfilled, (state, action) => {
      state.list = state.list.filter((value) => value.id !== action.payload);
    });
    builder.addCase(updateTodoAction.fulfilled, (state, action) => {
      state.list = state.list.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    });
  },
});

export default todoSlice.reducer;
