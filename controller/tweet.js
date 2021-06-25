import * as tweetsRepository from "../model/tweet.js";

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetsRepository.getTweetsByUsername(username)
        : tweetsRepository.getAllTweets());
    return res.status(200).json(data);
}

export async function getTweetById(req, res) {
    const id = req.params.id;
    const data = await tweetsRepository.getTweetsById(id);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function postTweet(req, res) {
    const { text, username, name } = req.body;
    const tweet = await tweetsRepository.createTweet(text, name, username);
    return res.status(201).json(tweet);
}

export async function putTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetsRepository.updateTweet(id, text);
    if (tweet) {
        return res.status(200).json(tweet);
    } else {
        return res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function deleteTweet(req, res) {
    const id = req.params.id;
    await tweetsRepository.deleteTweet(id);
    return res.sendStatus(204);
}
