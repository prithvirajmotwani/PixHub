import Storage from "../modals/storage.modal.js";
import axios from "axios";
import convertSize from "convert-size";
const handleEvent = async (type, data) => {
  console.log(type, data);
  if (type === "userCreated") {
    const newUser = new Storage({ userId: data.userId });
    const user = await newUser.save();
    // console.log(user);
  }
  if (type === "imageUploaded") {
    const userId = data.userId;
    const storage = convertSize(data.imgSize, "MB");
    const user = await Storage.findOne({ userId });
    if (!user) {
      return next(errorHandler(403, "User not found"));
    }

    const newStorage = user._doc.storageRemaining - storage;
    // const newStorage = user._doc.storageRemaining - data.imgSize;
    const result = await Storage.updateOne(
      { userId },
      { $set: { storageRemaining: newStorage } }
    );
    if (result.nModified === 0) {
      return next(errorHandler(500, "Error updating storage"));
    }
    const event = {
      type: "storageUpdated",
      data: {
        userId: userId,
        newStorage: newStorage,
      },
    };
    axios
      .post(`${process.env.EVENT_MANAGEMENT_URL}/api/events`, event)
      .catch((err) => {
        console.log(err.message);
      });
  }
  if (type === "imageDeleted") {
    const userId = data.userId;
    const storage = convertSize(data.imgSize, "MB");
    const user = await Storage.findOne({ userId });
    if (!user) {
      return next(errorHandler(403, "User not found"));
    }

    const newStorage = user._doc.storageRemaining + storage;
    // const newStorage = user._doc.storageRemaining + data.imgSize;
    const result = await Storage.updateOne(
      { userId },
      { $set: { storageRemaining: newStorage } }
    );
    if (result.nModified === 0) {
      return next(errorHandler(500, "Error updating storage"));
    }
    const event = {
      type: "storageUpdated",
      data: {
        userId: userId,
        newStorage: newStorage,
      },
    };
    axios
      .post(`${process.env.EVENT_MANAGEMENT_URL}/api/events`, event)
      .catch((err) => {
        console.log(err.message);
      });
  }
};
export const eventHandler = async (req, res, next) => {
  const { type, data } = req.body;

  try {
    handleEvent(type, data);
    const myuser = await Storage.findOne({ userId: data.userId });
    res.status(201).json({ message: "event recieved", updateuser: myuser });
  } catch (error) {
    return next(error);
  }
};
