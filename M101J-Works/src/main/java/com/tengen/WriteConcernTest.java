package com.tengen;

import java.net.UnknownHostException;
import java.util.Arrays;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.WriteConcern;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class WriteConcernTest {
	public static void main(String[] args) throws UnknownHostException, InterruptedException {
			
			MongoClient	mongoClient = new MongoClient(Arrays.asList(
					new ServerAddress("localhost", 27017),
					new ServerAddress("localhost", 27018),
					new ServerAddress("localhost", 27019)
					));
			mongoClient.setWriteConcern(WriteConcern.JOURNALED);
			
			DB db = mongoClient.getDB("course");
			db.setWriteConcern(WriteConcern.JOURNALED);
			
			DBCollection collection = db.getCollection("replica.test");
			collection.setWriteConcern(WriteConcern.JOURNALED);
			collection.drop();
			
			BasicDBObject basicDBObject = new BasicDBObject("_id", 1);
			collection.insert(basicDBObject);
			
			try {
				collection.insert(basicDBObject, WriteConcern.UNACKNOWLEDGED); // we won't get any any exception
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
	}
}
