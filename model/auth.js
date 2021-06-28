import bcrypt from "bcrypt";
import { config } from "../config.js";

let users = [
    {
        userid: 1624856981977,
        username: "lsk",
        password:
            "$2b$10$Du5jiGH9yROCl0.wXmhFxua/9xN3BEs2rBDcGa5DOHzlLRSbiRkme",
        name: "LSK",
        email: "prog106@gmail.com",
        url: "",
    },
];

const saltRounds = config.bcrypt.saltRounds;

export async function getUser(userid) {
    return await users.find((item) => item.userid === userid);
}

export async function LoginUser(username, password) {
    return await users
        .filter((item) => item.username === username)
        .find((item) => bcrypt.compareSync(password, item.password));
}

export function signupUser(username, password, name, email, url) {
    const hashed = bcrypt.hashSync(password, saltRounds);
    const user = {
        userid: Date.now(),
        username: username,
        password: hashed,
        name: name,
        email: email,
        url: url,
    };
    users.push(user);
    // let users = [...users, user];
    return user;
}
