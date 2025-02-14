import mongoose from "mongoose";
const photoSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User id is required"],
  },
  images: [
    {
      imgId: {
        type: String,
      },
      imgUrl: {
        type: String,
      },
      imgSize: {
        type: String,
      },
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  storageRemaining: {
    type: Number,
    default: 100,
  },
  usageRemaining: {
    type: Number,
    default: 150,
  },
});

const Photos = mongoose.model("Photos", photoSchema);
export default Photos;
