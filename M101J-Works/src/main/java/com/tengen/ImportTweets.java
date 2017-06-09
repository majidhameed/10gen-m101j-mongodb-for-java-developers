package com.tengen;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class ImportTweets {
	public static void main(String[] args) {
		final String screenName = args.length!=0 ? args[0] : "10gen";
		
		List<DBObject> tweets = null;
		MongoClient mongoClient = null;
		
		try {
			
			tweets = getLatestTweets(screenName);
			
			mongoClient = new MongoClient();
		} catch (Exception e) {
			e.printStackTrace();
		}
		DB db = mongoClient.getDB("course");
		DBCollection collection = db.getCollection("twitter");
		
		for (DBObject tweet : tweets) {
			tweet.put("screen_name", screenName);
			massageTweetId(tweet);
			try {
				massageTweet(tweet);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			collection.update(new BasicDBObject("_id",tweet.get("_id")),tweet,true,false);
		}
		
		System.out.println("Tweet Count:" + collection.count());
		mongoClient.close();
	}

	private static void massageTweet(DBObject tweet) throws ParseException {
		BasicDBObject user = (BasicDBObject) tweet.get("user");
		
		BasicDBObject modifiedUser = new BasicDBObject();
		for (String key:user.keySet()) {
			if (key.equalsIgnoreCase("id") || key.equalsIgnoreCase("name") || key.equalsIgnoreCase("screen_name")) {
				modifiedUser.put(key, user.get(key));
			}
		}
		
		tweet.put("user", modifiedUser);
		
		DateFormat dateFormat = new SimpleDateFormat("EEE MMM d H:m:s Z y");
		tweet.put("created_at",dateFormat.parse((String) tweet.get("created_at")));
	}

	private static void massageTweetId(DBObject tweet) {
		Object _id = tweet.get("id");
		tweet.removeField("id");
		tweet.put("_id",_id);
	}

	@SuppressWarnings("unchecked")
	private static List<DBObject> getLatestTweets(String screenName) throws IOException {
		List<DBObject> tweets = new ArrayList<DBObject>(0);
		
		URL url = new URL("http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screenName+"&include_rts=1");
		
		InputStream inputStream = url.openStream();
		
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		
		int retVal;
		while((retVal = inputStream.read())!=-1) {
			byteArrayOutputStream.write(retVal);
		}
		
		inputStream.close();
		
		final String tweetsString = byteArrayOutputStream.toString();
		
		tweets = (List<DBObject>) JSON.parse(tweetsString);
		
		return tweets;
	}
}
