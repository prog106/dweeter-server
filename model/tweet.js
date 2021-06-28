import * as authModel from "../model/auth.js";

let tweets = [
    {
        id: "1",
        text: "hi",
        createdAt: new Date().toString(),
        userid: 1624856981977,
    },
    {
        id: "2",
        text: "hi!!",
        createdAt: new Date().toString(),
        userid: 1624856981977,
    },
];

export async function getAllTweets() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await authModel.getUser(
                tweet.userid
            );
            return { ...tweet, username, name, url };
        })
    );
}

export async function getTweetsByUsername(username) {
    return getAllTweets().then((tweet) =>
        tweet.filter((item) => item.username === username)
    );
}

export async function getTweetsById(id) {
    const tweet = tweets.find((item) => item.id === id);
    const { username, name, url } = await authModel.getUser(tweet.userid);
    return { ...tweet, username, name, url };
}

export async function createTweet(text, userid) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toString(),
        userid,
    };
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function updateTweet(id, text, userid) {
    const tweet = tweets.find(
        (item) => item.id === id && item.userid === userid
    );
    if (tweet) tweet.text = text;
    return tweet;
}

export async function deleteTweet(id, userid) {
    tweets = tweets.filter((item) => item.id !== id && item.userid === userid);
    return true;
}
