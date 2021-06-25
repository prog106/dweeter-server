let tweets = [
    {
        id: "1",
        text: "hi",
        createdAt: Date.now(),
        name: "Bob",
        username: "bob",
        url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
    },
    {
        id: "2",
        text: "hi!!",
        createdAt: Date.now(),
        name: "LSK",
        username: "lsk",
        url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
    },
];

export async function getAllTweets() {
    return tweets;
}

export async function getTweetsByUsername(username) {
    return tweets.filter((item) => item.username === username);
}

export async function getTweetsById(id) {
    return tweets.find((item) => item.id === id);
}

export async function createTweet(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function updateTweet(id, text) {
    const tweet = tweets.find((item) => item.id === id);
    if (tweet) tweet.text = text;
    return tweet;
}

export async function deleteTweet(id) {
    tweets = tweets.filter((item) => item.id !== id);
    return true;
}
