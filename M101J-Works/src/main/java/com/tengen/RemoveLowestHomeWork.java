package com.tengen;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

/**
 * 
 * @author Majid Hameed
 *
 */

public class RemoveLowestHomeWork {

	public static void main(String[] args) throws UnknownHostException {
		
		MongoClient mongoClient = new MongoClient();
		DB db = mongoClient.getDB("students");
		DBCollection collection = db.getCollection("grades");
		
		DBCursor cursor = collection.find(new BasicDBObject("type","homework")).sort(new BasicDBObject("student_id",1).append("score", 1));
		try {
			Integer student_id = null;
			int removedCount=0;
			int studentHomeworkCount=0;
			DBObject removeDbObject=null;
			while(cursor.hasNext()) {
				DBObject dbObject = cursor.next();
				if (!((Integer) dbObject.get("student_id")).equals(student_id)) {
					System.out.println("student_id:"+student_id + " has " + studentHomeworkCount + " homeworks");
					if (studentHomeworkCount>1) {
						collection.remove(removeDbObject);
						System.out.println("Removed:" + removeDbObject);
						removedCount++;
					}
					studentHomeworkCount=0;
					System.out.println();
					removeDbObject = dbObject;
				} 
				student_id = (Integer) dbObject.get("student_id");
				System.out.println(dbObject);
				studentHomeworkCount++;
			}
			//Remove last student lowest homework
			if (studentHomeworkCount>1) {
				collection.remove(removeDbObject);
				System.out.println("Removed:" + removeDbObject);
				removedCount++;
			}
			System.out.println("removedCount:"+removedCount);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			cursor.close();
		}
	}
}
