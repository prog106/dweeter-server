import express from "express";
import "express-async-errors";
import { body, param } from "express-validator";
import * as tweetsController from "../controller/tweet.js";
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
router.get("/", tweetsController.getTweets);

// GET /Tweets/:id
router.get("/:id", [validateId, validate], tweetsController.getTweetById);

// POST /Tweets
router.post(
    "/",
    [
        validateTweet,
        body("username")
            .trim()
            .notEmpty()
            .withMessage("사용자 정보가 없습니다."),
        body("name").trim().notEmpty().withMessage("이름을 입력하세요."),
        validate,
    ],
    tweetsController.postTweet
);

// PUT /Tweets
router.put(
    "/:id",
    [validateId, validateTweet, validate],
    tweetsController.putTweet
);

// DELETE /Tweets/:id
router.delete("/:id", [validateId, validate], tweetsController.deleteTweet);

export default router;
