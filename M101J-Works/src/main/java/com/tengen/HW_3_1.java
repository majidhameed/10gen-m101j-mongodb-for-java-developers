package com.tengen;

import java.net.UnknownHostException;

import com.mongodb.BasicDBList;
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
public class HW_3_1 {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		MongoClient mongoClient = null;
		try {
			mongoClient = new MongoClient();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		DB db = mongoClient.getDB("school");
		DBCollection collection = db.getCollection("students");

		DBCursor cursor = collection.find();

		Integer _id = null;
		try {
			while (cursor.hasNext()) {
				DBObject dbObject = cursor.next();
				System.out.println(dbObject);
				_id = (Integer) dbObject.get("_id");
				BasicDBList scoresList = (BasicDBList) dbObject.get("scores");
				
				BasicDBObject scoreObject = null;
				BasicDBObject lowestScoreObject = null;
				Double lowScore = null;
				String type=null;
				
				int homeworkCount = 0;
				for (Object object : scoresList) {
					scoreObject = (BasicDBObject) object;
					type = (String)scoreObject.get("type");
					
					if (!"homework".equals(type)) {
						continue;
					}
					
					homeworkCount++;
					
					if (lowScore==null || (Double)scoreObject.get("score")<lowScore) {
						lowScore = (Double)scoreObject.get("score");
						lowestScoreObject = scoreObject;
					}
					
					System.out.println(object);
				}
				
				System.out.println("total homeworks:" + homeworkCount);
				
				if (homeworkCount>1) {
					System.out.println("Removing lowest homework:" + lowestScoreObject);
					scoresList.remove(lowestScoreObject);
					collection.update(new BasicDBObject("_id",_id), new BasicDBObject("$set", new BasicDBObject("scores",scoresList)));
				}
				
				System.out.println("\n\n");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			cursor.close();
			mongoClient.close();
		}
	}

}
