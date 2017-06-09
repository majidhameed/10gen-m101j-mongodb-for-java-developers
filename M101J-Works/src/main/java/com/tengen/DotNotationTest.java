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
public class DotNotationTest {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient client = new MongoClient();
		DB courseDB = client.getDB("course");
		DBCollection lines = courseDB.getCollection("dotNotationTest");
		lines.drop();
		Random rand = new Random();

		// insert 10 documents with a random integer as the value of field "x"
		for (int i = 0; i < 10; i++) {
			lines.insert(new BasicDBObject("_id",i).
					append("start", new BasicDBObject("x",rand.nextInt(90)+10).append("y", rand.nextInt(90)+10)).
					append("end", new BasicDBObject("x",rand.nextInt(90)+10).append("y", rand.nextInt(90)+10)))
					;
		}
		
		QueryBuilder builder = QueryBuilder.start("start.x").greaterThan(50);
		
		DBCursor cursor = lines.find(builder.get(), new BasicDBObject("start.y",1).append("_id", 0));

		try {
			while (cursor.hasNext()) {
				DBObject cur = cursor.next();
				System.out.println(cur);
			}
		} finally {
			cursor.close();
			client.close();
		}


	}
}
