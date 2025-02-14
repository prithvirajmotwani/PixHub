import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  success: false,
  message: "",
  error: "",
};

export const deleteImage = createAsyncThunk(
  "Images/deleteImage",
  async (data, { rejectWithValue }) => {
    const { userId, imgId } = data;
    console.log(imgId);
    try {
      const config = {
        // headers: { "content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_PHOTOS_BACKEND_URL}/deleteImage/${userId}`,
        {
          data: { imgId }, // include data in the request body
          ...config,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteImageSlice = createSlice({
  name: "deleteImage",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteImage.pending, (state) => {
      console.log("in pending");
      state.loading = true;
    });
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.error = "";
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default deleteImageSlice.reducer;
