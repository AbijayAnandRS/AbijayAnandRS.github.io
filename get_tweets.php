<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '739888573004976130-qBrChRZd7UnIYvnHk08oUyeCf8Nvwtc';
$oauth_access_token_secret = '6ELGDfeWoBD1mubhh9GcBBRF10BLV3SYrNUmZiQpDnJiH';
$consumer_key = 'e22x6jV9f4NkkT6jjUCshWpCA';
$consumer_secret = '4t9FzFJDX12vN3HcPgdN5shpqaS0isAnzVVY93hveGze1rgznh';
$user_id = '739888573004976130';
$screen_name = 'weibergmedia';
$count = 1;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>