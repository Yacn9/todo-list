import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "types";

type InitialState = {
  loading: boolean;
  list: ITodo[];
};
const initialState: InitialState = {
  loading: false,
  list: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<ITodo[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setList } = todoSlice.actions;
export default todoSlice.reducer;
