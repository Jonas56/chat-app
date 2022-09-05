import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpLoginUser, httpRegisterUser } from "../../api/authService";
import { CreateUserRequest } from "../../api/types";
import { DiscussionSliceState } from "./types";

const initialState: DiscussionSliceState = {
  activeDiscussion: null,
  discussions: [],
};

export const activate = createAsyncThunk(
  "discussion/activate",
  async (credentials: CreateUserRequest, thunkAPI): Promise<any> => {
    try {
      return await httpRegisterUser(credentials);
    } catch (error: any) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const setDiscussions = createAsyncThunk(
  "discussion/active",
  async (credentials: any, thunkAPI): Promise<any> => {
    try {
      return await httpLoginUser(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("userChatApp");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(activate.pending, (state) => {})
      .addCase(activate.fulfilled, (state, action) => {})
      .addCase(activate.rejected, (state, action) => {})
      // login
      .addCase(setDiscussions.pending, (state) => {})
      .addCase(setDiscussions.fulfilled, (state, action) => {})
      .addCase(setDiscussions.rejected, (state, action) => {})
      // logout
      .addCase(logout.fulfilled, (state) => {});
  },
});

export default authSlice.reducer;
