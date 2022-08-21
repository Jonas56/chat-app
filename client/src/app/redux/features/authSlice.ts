import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { httpLoginUser, httpRegisterUser } from "../../api/authService";
import { CreateUserRequest } from "../../api/types";
import { AuthSliceState } from "./types";

// get user from local storage
const user = JSON.parse(localStorage.getItem("userChatApp")!);

const initialState: AuthSliceState = {
  isAuthenticated: false,
  user: user ? user : null,
  message: null,
  isLoading: false,
  status: "idle",
  errorMessage: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: CreateUserRequest, thunkAPI): Promise<any> => {
    try {
      return await httpRegisterUser(credentials);
    } catch (error: any) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
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
  const navigate = useNavigate();
  navigate("/login?token_expired=true");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: AuthSliceState) => {
      state.isAuthenticated = false;
      state.user = null;
      state.message = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.status = "fulfilled";
        state.message = "Successfully registered";
        state.errorMessage = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.errorMessage = "" + action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.status = "rejected";
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.message = "";
        state.status = "idle";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.message = "Successfully logged in";
        state.status = "fulfilled";
      })
      .addCase(login.rejected, (state, action) => {
        state.message = "Wrong credentials!";
        state.isAuthenticated = false;
        state.isLoading = false;
        state.status = "rejected";
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.message = null;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
