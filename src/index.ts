import TwitterConnector from "./twitterConnector";

exports.handler = async (event, context) => {

    const connector = new TwitterConnector();
    await connector.searchTweets();

    const response = {
        statusCode: 200,
        body: JSON.stringify('twitter access finish!!'),
    };
    return response;
};