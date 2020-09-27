const Twitter = require('twitter');

const twitterClient = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

export default class TwitterConnector {

    public searchTweets() {
        console.log("search tweets.");
        const apiPath = "search/tweets";
        /**
         * 検索クエリ：プレゼント フォロー リツイート
         * リツートは除外
         */
        const params = {q: "プレゼント フォロー リツイート exclude:retweets", locale: "ja", count:10};
        twitterClient.get(apiPath, params)
            .then((tweets) => {
                // ツイート毎にループしてリツイートとフォローを行う
                const statuses = tweets["statuses"]; // ツイートの情報
                console.log(statuses.length + "件取得しました。");
                statuses.forEach(status => {
                    const user = status["user"];
                    console.log("https://twitter.com/" + user["screen_name"] + "/status/" + status["id_str"]); // これでツイートのページへアクセスできるよ

                    // 取得したツイートのユーザをまだフォローしていなかったらフォローする
                    this.follow(user["id_str"])
                    // 取得したツイートをリツイートする
                    this.retweet(status["id_str"])
                });
            })
            .catch((error) => {
                console.log("failed.");
                console.log("==========================");
                console.log(error);
                console.log("==========================");
            })
    }

    public retweet(tweetId: string) {
        const apiPath = `statuses/retweet/${tweetId}`;
        const params = {id: `${tweetId}`, trim_user: "t"};
        twitterClient.post(apiPath, params)
            .then((tweets) => {
                console.log(tweets);
            })
            .catch((error) => {
                console.log("failed.");
                console.log("==========================");
                console.log(error);
                console.log("==========================");
            })
    }

    public follow(userId: string) {
        const apiPath = `friendships/create`;
        const params = {user_id: `${userId}`};
        twitterClient.post(apiPath, params)
            .then((tweets) => {
                console.log(tweets);
            })
            .catch((error) => {
                console.log("failed.");
                console.log("==========================");
                console.log(error);
                console.log("==========================");
            })
    }
}
