import jwt from "jsonwebtoken";
import * as authModel from "../model/auth.js";
import { config } from "../config.js";

const secret = config.jwt.secret;
const expires = config.jwt.expires;

export async function signupUser(req, res) {
    const { username, password, name, email, url } = req.body;
    const user = await authModel.signupUser(
        username,
        password,
        name,
        email,
        url
    );
    const token = jwt.sign(
        {
            userid: user.userid,
        },
        secret,
        {
            expiresIn: expires,
        }
    );
    if (user) return res.status(200).json({ token: token, username: username });
    else return res.sendStatus(201);
}

export async function loginUser(req, res) {
    const { username, password } = req.body;
    const user = await authModel.loginUser(username, password);
    if (!user) return res.status(200).json({ message: `User not found` });
    const token = jwt.sign(
        {
            id: user.id,
        },
        secret,
        {
            expiresIn: expires,
        }
    );
    console.log(token);
    if (user) return res.status(200).json({ token: token, username: username });
    return res.status(200).json(user);
}

export async function me(req, res, next) {
    const user = await authModel.getUser(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ username: user.username });
}
