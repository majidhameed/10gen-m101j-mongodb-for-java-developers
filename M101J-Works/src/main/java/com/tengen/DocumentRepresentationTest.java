package com.tengen;

import java.util.Arrays;
import java.util.Date;

import com.mongodb.BasicDBObject;

/**
 * 
 * @author Majid Hameed
 * 
 */
public class DocumentRepresentationTest {
	public static void main(String[] args) {
		BasicDBObject doc = new BasicDBObject();
		doc.put("userName", "jyemin");
		doc.put("birthDate", new Date(234832423));
		doc.put("programmer", true);
		doc.put("age", 8);
		doc.put("lanaguaes", Arrays.asList("Java", "C++"));
		doc.put("address",
				new BasicDBObject("street", "20 Main")
						.append("town",	"Westfild")
						.append("zip", "56789"));
	}
}
