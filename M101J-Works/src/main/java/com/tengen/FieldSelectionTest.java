package com.tengen;

import java.net.UnknownHostException;
import java.util.Random;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.QueryBuilder;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class FieldSelectionTest {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient client = new MongoClient();
		DB courseDB = client.getDB("course");
		DBCollection collection = courseDB.getCollection("fieldSelectionTest");
		collection.drop();
		Random rand = new Random();

		// insert 10 documents with a random integer as the value of field "x"
		for (int i = 0; i < 10; i++) {
			collection.insert(new BasicDBObject().append("x", rand.nextInt(2)).append("y", rand.nextInt(100)).append("z", rand.nextInt(1000)));
		}
		
		QueryBuilder builder = QueryBuilder.start("x").is(0).and("y").greaterThan(10).lessThan(90);
		
		System.out.println("\nFind All:");
		DBCursor cursor = collection.find(builder.get(), new BasicDBObject("y",1).append("_id", false));

		try {
			while (cursor.hasNext()) {
				DBObject cur = cursor.next();
				System.out.println(cur);
			}
		} finally {
			cursor.close();
		}


	}
}
