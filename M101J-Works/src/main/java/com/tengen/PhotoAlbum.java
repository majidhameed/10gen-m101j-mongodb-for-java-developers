package com.tengen;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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
public class PhotoAlbum {
	
	public static void main(String[] args) throws UnknownHostException {
		MongoClient mongoClient = new MongoClient();
		
		DB db = mongoClient.getDB("photo_album");
		DBCollection imagesCollection = db.getCollection("images");
		DBCollection albumsCollection = db.getCollection("albums");
		
		DBCursor cursor = imagesCollection.find();
		
		int imageId;
		
		List<Integer> orphanImageIds = new ArrayList<Integer>(0);
		for (Iterator<DBObject> iterator = cursor.iterator(); iterator.hasNext();) {
			BasicDBObject imageObject = (BasicDBObject) iterator.next();
			imageId = (Integer) imageObject.get("_id");
			if (albumsCollection.findOne(new BasicDBObject("images",imageId))==null) {
				orphanImageIds.add(imageId);
			}
		}
		
		System.out.println("Orphan Images:" + orphanImageIds);
		
		for (Integer orphanImageId : orphanImageIds) {
			imagesCollection.remove(new BasicDBObject("_id", orphanImageId));
			System.out.println("Removed Image _id:" + orphanImageId);
		}
		
		cursor.close();
		mongoClient.close();
	}
}
