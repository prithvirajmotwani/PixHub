import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
let initialState = {
  isAuthenticated: false,
  message: "",
  loading: false,
  error: "",
  user: {},
};
if (typeof window !== "undefined") {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    initialState = JSON.parse(userInfo);
  }
}
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_USER_BACKEND_URL}/signin`,
        userData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.user = action.payload.validUser;
      state.isAuthenticated = true;
      state.error = "";
      // Update localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(state));
      }
      //   console.log(action);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // console.log("in eroor...........................");
      // console.log(action.payload.message);
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default userLoginSlice.reducer;
