import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
let initialState = {
  success: false,
  loading: false,
  error: "",
  data: {},
};
if (typeof window !== "undefined") {
  const userData = localStorage.getItem("userData");
  if (userData) {
    initialState = JSON.parse(userData);
  }
}
export const getUserData = createAsyncThunk(
  "user/getData",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_BACKEND_URL}/user-data/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userDataSlice = createSlice({
  name: "getUserData",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.data = action.payload.data;
      state.success = true;
      state.error = "";
      // Update localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(state));
      }
      //   console.log(action);
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.success = false;
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default userDataSlice.reducer;
