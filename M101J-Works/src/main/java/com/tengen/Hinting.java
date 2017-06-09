package com.tengen;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class Hinting {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient mongoClient = new MongoClient();

		DB db = mongoClient.getDB("test");

		DBCollection collection = db.getCollection("foo");

		// DBObject doc = collection.find().hint("a_1_b_-1_c_1").explain();
		// OR
		BasicDBObject myHint = new BasicDBObject("a", 1).append("b", -1)
				.append("c", 1);
		DBObject doc = collection.find().hint(myHint).explain();

		for (String key : doc.keySet()) {
			System.out.printf("%25s:%s\n", key, doc.get(key));
		}

	}
}
