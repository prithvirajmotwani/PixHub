import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  success: false,
  loading: false,
  message: "",
  error: "",
};

export const logoutUser = createAsyncThunk(
  "user/Logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
        //  credentials: 'include'
      };
      const response = await axios.post(
        // `https://website-backend-eight.vercel.app/api/v1/logout`,
        `${process.env.REACT_APP_USER_BACKEND_URL}/signout`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogoutSlice = createSlice({
  name: "userLogout",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.error = "";
      // Update localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        // localStorage.removeItem("userData");
      }
      //   console.log(action);
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default userLogoutSlice.reducer;
