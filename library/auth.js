import jwt from "jsonwebtoken";
import * as authModel from "../model/auth.js";
import { config } from "../config.js";

const secret = config.jwt.secret;

// Header Authorization 공통 사용
export const isAuth = (req, res, next) => {
    let token;

    const authHeader = req.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        token = req.cookies["token"];
    }
    if (!token) {
        return res.status(401).json({ message: "Authorization Error1" });
    }
    jwt.verify(token, secret, async (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Authorization 2" + error });
        }
        const user = await authModel.getUser(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Authorization Error3" });
        }
        req.id = user.id;
        req.token = token;
        next();
    });
};
