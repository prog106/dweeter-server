import express from "express";
import "express-async-errors";
import { body, param } from "express-validator";
import * as tweetsController from "../controller/tweet.js";
import { isAuth } from "../library/auth.js";
import { validate } from "../library/validate.js";

const router = express.Router();

// Validation
// Sanitization
// Contract Testing: Client - Server 간 규격
const validateTweet = body("text")
    .trim()
    .notEmpty()
    .withMessage("메시지를 입력하세요")
    .isLength({ min: 3 })
    .withMessage("메시지가 너무 짧습니다.");
const validateId = param("id").trim().isInt().withMessage("숫자만 입력");

// GET /Tweets
router.get("/", isAuth, tweetsController.getTweets);

// GET /Tweets/:id
router.get(
    "/:id",
    isAuth,
    [validateId, validate],
    tweetsController.getTweetById
);

// POST /Tweets
router.post("/", isAuth, [validateTweet, validate], tweetsController.postTweet);

// PUT /Tweets
router.put(
    "/:id",
    isAuth,
    [validateId, validateTweet, validate],
    tweetsController.putTweet
);

// DELETE /Tweets/:id
router.delete(
    "/:id",
    isAuth,
    [validateId, validate],
    tweetsController.deleteTweet
);

export default router;
