import express from "express";

import {
  getUsage,
  newUser,
  updateUsage,
} from "../controlers/usage.controler.js";
const router = express.Router();

router.get("/get/:userId", getUsage);
router.post("/newUser", newUser);
router.put("/update/:userId", updateUsage);
// router.post("/delete",deleteImage)
export default router;
