import TwitterConnector from './twitterConnector';

// classを指定してクラス化
class Main {
    public async doProcess() {
        const connector = new TwitterConnector();
        await connector.searchTweets()
            .then((res) => {
                console.log("process is success.")
            })
            .catch((error) => {
                console.log("process is failed.")
            });
    }
}

// Mainクラスのインスタンスを作る
const main = new Main();
main.doProcess().then();
