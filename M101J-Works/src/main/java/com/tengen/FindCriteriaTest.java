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
public class FindCriteriaTest {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient client = new MongoClient();
		DB courseDB = client.getDB("course");
		DBCollection collection = courseDB.getCollection("findCriteriaTest");

		collection.drop();

		// insert 10 documents with a random integer as the value of field "x"
		for (int i = 0; i < 10; i++) {
			collection.insert(new BasicDBObject().append("x", new Random().nextInt(2)).append("y", new Random().nextInt(100)));
		}
		
		DBObject query = new BasicDBObject("x",0).append("y", new BasicDBObject("$gt",10).append("$lt", 90));
		// or we can use query builder
		
		QueryBuilder builder = QueryBuilder.start("x").is(0).and("y").greaterThan(10).lessThan(90);
		
		System.out.println("\nCount:");
		long count = collection.count(query);
		System.out.println(count);

		System.out.println("\nFind All:");
		DBCursor cursor = collection.find(builder.get());

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
