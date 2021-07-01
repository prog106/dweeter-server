import bcrypt from "bcrypt";
import { config } from "../config.js";
import { db } from '../db/database.js';




const saltRounds = config.bcrypt.saltRounds;

export async function getUser(id) {
    return db.execute(`SELECT * FROM dwitter_user WHERE id = ?`, [id]).then(result => {
        return result[0][0];
    });
    // return await users.find((item) => item.userid === userid);
}

export async function loginUser(username, password) {
    return db.execute(`SELECT * FROM dwitter_user WHERE username = ?`, [username]).then(result => {
        const user = result[0][0];
        if(!user) return null;
        const auth = bcrypt.compareSync(password, user.password);
        return auth && user || null;
    });
    // return await users
    //     .filter((item) => item.username === username)
    //     .find((item) => bcrypt.compareSync(password, item.password));
}

export function signupUser(username, password, name, email, url) {
    const hashed = bcrypt.hashSync(password, saltRounds);
    return db.execute('INSERT INTO dwitter_user (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)',
    [username, hashed, name, email, url]).then(result => {
        return result[0].insertId;
    });
}
