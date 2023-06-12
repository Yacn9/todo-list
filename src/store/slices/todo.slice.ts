import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EStatus, ITodo } from "types";

type InitialState = {
  status: EStatus;
  list: ITodo[];
};
const initialState: InitialState = {
  status: EStatus.init,
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
