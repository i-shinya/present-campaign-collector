import TwitterConnector from './twitterConnector';

// classを指定してクラス化
class Main {
    // コンストラクター
    constructor() {
        const connector = new TwitterConnector();
        connector.searchTweets();
    }
}

// Mainクラスのインスタンスを作る
const main = new Main();
