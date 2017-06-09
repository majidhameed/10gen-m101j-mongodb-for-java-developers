package com.tengen;

import java.net.UnknownHostException;
import java.util.Arrays;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class ReadPreferenceTest {
	public static void main(String[] args) throws UnknownHostException, InterruptedException {
			
			MongoClient	mongoClient = new MongoClient(Arrays.asList(
					new ServerAddress("localhost", 27017),
					new ServerAddress("localhost", 27018),
					new ServerAddress("localhost", 27019)
					));
			mongoClient.setReadPreference(ReadPreference.primary());
			
			DB db = mongoClient.getDB("course");
			db.setReadPreference(ReadPreference.primaryPreferred());
			
			DBCollection collection = db.getCollection("replica.test");
			collection.setReadPreference(ReadPreference.nearest());
			
			DBCursor cursor = collection.find().setReadPreference(ReadPreference.nearest());
			
			try {
				while (cursor.hasNext()) {
					DBObject dbObject = (DBObject) cursor.next();
					System.out.println(dbObject);
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			} finally {
				cursor.close();	
			}
			
			
			
	}
}
