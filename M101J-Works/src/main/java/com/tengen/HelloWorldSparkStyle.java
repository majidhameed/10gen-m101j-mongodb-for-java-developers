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
public class HelloWorldSparkStyle {
	public static void main(String[] args) {
		Spark.get(new Route("/") {
			@Override
			public Object handle(final Request request, final Response response) {
				return "Hello World From Spark";
			}
		});
	}
}
