package com.tengen;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class GridFSTest {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient mongoClient = new MongoClient();
		
		DB db = mongoClient.getDB("course");
		
		GridFS videos = new GridFS(db, "videos");
		
		InputStream inputStream = null;
		try {
			inputStream = new FileInputStream("test.mp4");
			GridFSInputFile video = videos.createFile(inputStream, "test.mp4");
			
			BasicDBObject metadata = new BasicDBObject("description","importing from twitter");
			List<String> tags = new ArrayList<String>();
			tags.add("course");
			tags.add("MongoDB");
			tags.add("10gen");
			metadata.append("tags", tags);
			video.setMetaData(metadata);
			video.save();
			System.out.println("Object ID in Files collection:" + video.get("_id"));
			
			System.out.println("Saved the file to MongoDB");
			System.out.println("Now lets read it back out");
			
			GridFSDBFile gridFile = videos.findOne(new BasicDBObject("filename","test.mp4"));
			OutputStream outputStream = new FileOutputStream("test_copy.mp4");
			gridFile.writeTo(outputStream);
			System.out.println("Write the file back out");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		
	}
}
