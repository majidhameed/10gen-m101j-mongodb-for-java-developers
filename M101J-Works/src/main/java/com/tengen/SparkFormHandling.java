package com.tengen;

import java.io.StringWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

/**
 * 
 * @author Majid
 * 
 */
public class SparkFormHandling {
	public static void main(String[] args) {
		
		final Configuration configuration = new Configuration();
		configuration.setClassForTemplateLoading(SparkFormHandling.class, "/");
		
		Spark.get(new Route("/") {
			@Override
			public Object handle(final Request request, final Response response) {
				StringWriter writer = new StringWriter();
				try {
					Template fruitPickerTemplate = configuration.getTemplate("fruitPicker.ftl");
					
					Map<String,Object> fruitMap = new HashMap<String,Object>();
					fruitMap.put("fruits", Arrays.asList("apple","orange","banana","peach"));
					
					fruitPickerTemplate.process(fruitMap, writer);
				} catch (Exception e) {
					halt(500);
					return null;
				}
				return writer;
			}
		});
		
		Spark.post(new Route("/favorite_fruit") {

			@Override
			public Object handle(final Request request,final Response response) {
				String fruit = request.queryParams("fruit");
				return fruit!=null ? "Your favorite fruit is " + fruit : "Why don't you pick one?";
			}
			
		});
	}
}
