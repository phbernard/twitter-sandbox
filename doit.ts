require('dotenv').config()

import { FollowersList, FollowersListParams, TwitterClient } from 'twitter-api-client';

const doIt = async () => {
  const twitterApiKey = process.env.TWITTER_API_KEY;
  const twitterApiSecret = process.env.TWITTER_API_SECRET;
  if (!twitterApiKey || !twitterApiSecret) {
    console.log("ERROR: Twitter credentials are not configured");
    return;
  }

  const twitterClient = new TwitterClient({
    apiKey: twitterApiKey,
    apiSecret: twitterApiSecret,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  /*
  const user  = await twitterClient.accountsAndUsers.usersShow({ screen_name: '@ph_bernard' });
  console.log(user);
  */

  /*
  let nextCursor = undefined;
  do {
    console.log("Using " + nextCursor);
    const params: FollowersListParams  = { screen_name: '@ph_bernard' };
    if (nextCursor) {
      params.cursor = nextCursor;
    }
    //const followers: FollowersList = await twitterClient.accountsAndUsers.followersList(params);
    const followers: FollowersList = await twitterClient.accountsAndUsers.friendsList(params);
    console.log(followers.users.map(u => u.name));
    nextCursor = followers.next_cursor;
  } while (nextCursor);
  */

  const data = await twitterClient.tweets.statusesUserTimeline({ screen_name: '@ph_bernard' });
  console.log(data[0]);
}

(async () => {
  try {
    await doIt();
  }
  catch(e) {
    console.log(e);
  }
})();
