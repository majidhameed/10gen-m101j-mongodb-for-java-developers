package com.tengen;

import java.net.UnknownHostException;
import java.util.Arrays;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.ServerAddress;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class ReplicaSetTest {
	public static void main(String[] args) throws UnknownHostException, InterruptedException {
			MongoClient	mongoClient = new MongoClient(Arrays.asList(
					new ServerAddress("localhost", 27017),
					new ServerAddress("localhost", 27018),
					new ServerAddress("localhost", 27019)
					));
			
			DBCollection collection = mongoClient.getDB("course").getCollection("replica.test");
			collection.drop();
			
			for (int i = 0; i < Integer.MAX_VALUE; i++) {
				for (int retries = 0; retries < 5; retries++) {
					try {
						collection.insert(new BasicDBObject("_id", i));
						System.out.println("Inserted document:"+i);
						break;
					} catch (MongoException.DuplicateKey mDK) {
						System.out.println(mDK.getCode() + "|" + mDK.getMessage());
						System.out.println("document " + i + " is already inserted");
						break;
					} catch (MongoException me) {
						System.out.println(me.getCode() + "|" + me.getMessage());
						System.out.println("Retry: " + retries + " to insert " + i);
						Thread.sleep(10*1000);
					}
				}
				Thread.sleep(500);
			}
			

	}
}
