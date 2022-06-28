package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@WebServlet("/form-handler")
public class FormHandlerServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the value entered in the form.
    
    String rating = Jsoup.clean(request.getParameter("rating"), Whitelist.none());
    String description = Jsoup.clean(request.getParameter("description"), Whitelist.none());

    // Create instance of Datastore
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Reviews");    
    FullEntity reviewEntity =
    Entity.newBuilder(keyFactory.newKey())
        .set("rating", rating)
        .set("description", description)
        .build();
    datastore.put(reviewEntity);

    // Redirect back to website
    response.sendRedirect("/");
  }
}
