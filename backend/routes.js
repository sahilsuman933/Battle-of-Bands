import express from "express";

import image from "./Controllers/image";
import fetch from "./Controllers/fetchData";
const router = express.Router();

router.post("/images/generations", image.generateImage);
router.post("/submission", image.submission);
router.post("/votes", fetch.upVote);
router.post("/register", fetch.registerUser);
router.post("/data", fetch.addData);

// Get Data Routes [FOR EVENT MANAGEMENT]
router.get("/users", fetch.users);
router.post("/polling", fetch.polling);
router.get("/leaderboard", fetch.leaderboard);

export default router;
