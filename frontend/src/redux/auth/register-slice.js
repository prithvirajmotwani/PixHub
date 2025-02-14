import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  success: false,
  loading: false,
  error: "",
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_USER_BACKEND_URL}/signup`,
        userData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      //   console.log(action.payload);
      state.loading = false;

      state.success = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("in eroor...........................");
      console.log(action.payload.message);
      state.loading = false;

      state.success = false;
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default userRegisterSlice.reducer;
