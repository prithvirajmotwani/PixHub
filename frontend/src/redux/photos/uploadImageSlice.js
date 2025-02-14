import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  success: false,
  data: {},
  error: "",
};

export const uploadImage = createAsyncThunk(
  "Images/uploadImage",
  async (data, { rejectWithValue }) => {
    const { userId, image } = data;
    try {
      const config = {
        // headers: { "content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_PHOTOS_BACKEND_URL}/upload/${userId}`,
        image,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      console.log("in pending");
      state.loading = true;
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.success = true;
      state.error = "";
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default uploadImageSlice.reducer;
