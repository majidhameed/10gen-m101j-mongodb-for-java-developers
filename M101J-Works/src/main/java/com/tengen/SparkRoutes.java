package com.tengen;

import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

/**
 * 
 * @author Majid
 * 
 */
public class SparkRoutes {
	public static void main(String[] args) {
		
		Spark.get(new Route("/") {
			@Override
			public Object handle(final Request request, final Response response) {
				return "Hello World\n";
			}
		});
		
		Spark.get(new Route("/test") {
			@Override
			public Object handle(final Request request, final Response response) {
				return "This is a test page\n";
			}
		});
		
		Spark.get(new Route("/echo/:thing") {
			@Override
			public Object handle(final Request request, final Response response) {
				return request.params(":thing");
			}
		});
	}
}
