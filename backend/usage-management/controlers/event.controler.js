import Usage from "../modals/usage.modal.js";
import axios from "axios";
import convertSize from "convert-size";
const handleEvent = async (type, data) => {
  console.log(type, data);
  if (type === "userCreated") {
    const newUser = new Usage({ userId: data.userId });
    await newUser.save();
  }
  if (type === "imageUploaded") {
    const userId = data.userId;
    const usage = convertSize(data.imgSize, "MB");
    const user = await Usage.findOne({ userId });
    if (!user) {
      return next(errorHandler(403, "User not found"));
    }

    const newUsage = user._doc.usageRemaining - usage;
    // const newUsage = user._doc.usageRemaining - data.imgSize;
    const result = await Usage.updateOne(
      { userId },
      { $set: { usageRemaining: newUsage } }
    );
    if (result.nModified === 0) {
      return next(errorHandler(500, "Error updating Usage"));
    }
    const event = {
      type: "usageUpdated",
      data: {
        userId: userId,
        newUsage: newUsage,
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

    const myuser = await Usage.findOne({ userId: data.userId });
    res.status(201).json({ message: "event recieved", updateuser: myuser });
  } catch (error) {
    return next(error);
  }
};
