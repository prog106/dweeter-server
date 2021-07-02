// import * as authModel from "../model/auth.js";
import { db } from "../db/database.js";

export async function getAllTweets() {
    return db
        .execute(
            `SELECT
            DU.username, DU.name, DU.url,
            DT.id, DT.text, DT.createdAt, DT.user_id AS userid
        FROM dwitter_tweets DT
            JOIN dwitter_user DU ON DU.id = DT.user_id
        WHERE 1=1
        ORDER BY DT.createdAt DESC`,
            []
        )
        .then((result) => {
            return result[0];
        });
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const { username, name, url } = await authModel.getUser(
    //             tweet.userid
    //         );
    //         return { ...tweet, username, name, url };
    //     })
    // );
}

export async function getTweetsByUsername(username) {
    return db
        .execute(
            `SELECT
                DU.username, DU.name, DU.url,
                DT.id, DT.text, DT.createdAt
            FROM dwitter_tweets DT
                JOIN dwitter_user DU ON DU.id = DT.user_id AND DU.username = ?
            WHERE 1=1
            ORDER BY DT.createdAt DESC`,
            [username]
        )
        .then((result) => {
            return result[0];
        });
    // return getAllTweets().then((tweet) =>
    //     tweet.filter((item) => item.username === username)
    // );
}

export async function getTweetsById(id) {
    return db
        .execute(
            `SELECT
                DU.username, DU.name, DU.url,
                DT.id, DT.text, DT.createdAt
            FROM dwitter_tweets DT
                JOIN dwitter_user DU ON DU.id = DT.user_id
            WHERE 1=1
                AND DT.id = ?`,
            [id]
        )
        .then((result) => {
            return result[0][0];
        });
    // const tweet = tweets.find((item) => item.id === id);
    // const { username, name, url } = await authModel.getUser(tweet.userid);
    // return { ...tweet, username, name, url };
}

export async function createTweet(text, userid) {
    return db
        .execute(
            `INSERT INTO dwitter_tweets (text, createdAt, user_id) VALUES (?, ?, ?)`,
            [text, new Date(), userid]
        )
        .then((result) => {
            return getTweetsById(result[0].insertId);
        });
    // const tweet = {
    //     id: Date.now().toString(),
    //     text,
    //     createdAt: new Date().toString(),
    //     userid,
    // };
    // tweets = [tweet, ...tweets];
    // return tweet;
}

export async function updateTweet(id, text, userid) {
    return db
        .execute(
            `UPDATE dwitter_tweets SET text = ? WHERE id = ? AND user_id = ?`,
            [text, id, userid]
        )
        .then(() => {
            return getTweetsById(id);
        });
    // const tweet = tweets.find(
    //     (item) => item.id === id && item.userid === userid
    // );
    // if (tweet) tweet.text = text;
    // return tweet;
}

export async function deleteTweet(id, userid) {
    return db.execute(
        `DELETE FROM dwitter_tweets WHERE id = ? AND user_id = ?`,
        [id, userid]
    );
    // tweets = tweets.filter((item) => item.id !== id && item.userid === userid);
    // return true;
}
