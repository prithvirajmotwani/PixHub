import express from "express";
import { eventHandler } from "../controlers/event.controler.js";
const router = express.Router();

router.post("/events", eventHandler);

export default router;
