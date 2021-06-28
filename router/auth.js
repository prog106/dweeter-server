import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../library/validate.js";
import * as authController from "../controller/auth.js";
import { isAuth } from "../library/auth.js";

const router = express.Router();

router.post(
    "/signup",
    [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("아이디를 입력하세요.")
            .isLength({ min: 3 })
            .withMessage("아이디가 너무 짧습니다."),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("비밀번호를 입력하세요.")
            .isLength({ min: 4 })
            .withMessage("비밀번호가 너무 짧습니다."),
        body("name").trim().notEmpty().withMessage("이름을 입력하세요."),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("이메일을 입력하세요.")
            .isEmail()
            .withMessage("정상적인 이메일을 입력하세요"),
        validate,
    ],
    authController.signupUser
);

router.post(
    "/login",
    [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("아이디를 입력하세요.")
            .isLength({ min: 3 })
            .withMessage("아이디가 너무 짧습니다."),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("비밀번호를 입력하세요.")
            .isLength({ min: 4 })
            .withMessage("비밀번호가 너무 짧습니다."),
        validate,
    ],
    authController.LoginUser
);

router.get("/me", isAuth, authController.Me);

export default router;
