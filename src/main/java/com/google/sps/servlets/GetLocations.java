package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.google.sps.data.Review;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.Locations;


@WebServlet("/GetLocations")
public class GetLocations extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("Locations").setOrderBy(OrderBy.desc("Name")).build();
    QueryResults<Entity> results = datastore.run(query);

    List<Locations> locations = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();
      long id = entity.getKey().getId();
        String name = entity.getString("Name");
        String time = entity.getString("Time");
        String college = entity.getString("College");
        String description = entity.getString("Description");
      Locations locationObject = new Locations(id, name, time, description, college);
      locations.add(locationObject);
    }

    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(locations));
    
  }
}

