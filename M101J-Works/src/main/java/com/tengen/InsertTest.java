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
public class InsertTest {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient client = new MongoClient();
		DB courseDB = client.getDB("course");
		DBCollection collection = courseDB.getCollection("insertTest");
		
		collection.drop();
		
		DBObject doc = new BasicDBObject().append("x",1);
		// or we can explicitly put the BSON object id
		//DBObject doc = new BasicDBObject("_id", new ObjectId()).append("x",1);
		//DBObject doc2 = new BasicDBObject().append("x",2);
				
		System.out.println(doc);
		
		collection.insert(doc);
		//collection.insert(doc); // will result in an error
		
		// and we can insert multiples
		//collection.insert(Arrays.asList(doc,doc2));
		
		System.out.println(doc);
		client.close();
		
	}
}
