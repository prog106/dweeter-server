import { getSocketIO } from "../connection/socket.js";
import * as tweetsModel from "../model/tweet.js";

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetsModel.getTweetsByUsername(username)
        : tweetsModel.getAllTweets());
    return res.status(200).json(data);
}

export async function getTweetById(req, res) {
    const id = req.params.id;
    const data = await tweetsModel.getTweetsById(id);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function postTweet(req, res) {
    const { text } = req.body;
    const userid = req.id;
    const tweet = await tweetsModel.createTweet(text, userid);
    res.status(201).json(tweet);
    getSocketIO().emit("tweets", tweet);
}

export async function putTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const userid = req.id;
    const tweet = await tweetsModel.updateTweet(id, text, userid);
    if (tweet) {
        return res.status(200).json(tweet);
    } else {
        return res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function deleteTweet(req, res) {
    const id = req.params.id;
    const userid = req.id;
    await tweetsModel.deleteTweet(id, userid);
    return res.sendStatus(204);
}
