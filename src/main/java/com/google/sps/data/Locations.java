package com.google.sps.data;
import java.util.HashMap;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;



class StudySpot{
    /**
    * Class for a single study spot
    */
    private String name;
    private String address;
    private String college;
    private String hours;

    public StudySpot(
                String name,
                String address, 
                String college, 
                String hours) {
        this.name = name;
        this.address = address;
        this.college = college;
        this.hours = hours;
    }
  
    public String getName() {
      return this.name;
    }
  
    public String getAddress() {
      return this.address;
    }
  
    public String getCollege() {
      return this.college;
    }
  
    public String getHours() {
      return this.hours;
    }
  
  }


public class Locations {
    /**
    * Class to handle all locations,
    * includes accessing datastores and filtering by college.
    * Feel free to add more functions
    */
    HashMap<String, StudySpot> allSpots;

    public void setAllSpots(){
        /**
        * Pull from Locations datastore, add to class variable allSpots
        */
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("Locations").build();
        QueryResults<Entity> results = datastore.run(query);

        HashMap<String, StudySpot> studyspots = new HashMap<>();
        while (results.hasNext()) {
        Entity entity = results.next();

        String name = entity.getString("Name");
        String address = entity.getString("Address");
        String college = entity.getString("College");
        String hours = entity.getString("Time");

        StudySpot studySpotObject = new StudySpot(name, address, college, hours);
        studyspots.put(name, studySpotObject);
        }

        this.allSpots = studyspots;
    }

    public StudySpot getSpotByName(String name){
        return allSpots.get(name);
    }

    public HashMap<String, StudySpot> getSpotsByCollege(String collegeName){
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("Locations").setFilter(PropertyFilter.eq("College", collegeName)).build();
        QueryResults<Entity> results = datastore.run(query);

        HashMap<String, StudySpot> studyspots = new HashMap<>();
        while (results.hasNext()) {
        Entity entity = results.next();

        String name = entity.getString("Name");
        String address = entity.getString("Address");
        String college = entity.getString("College");
        String hours = entity.getString("Time");

        StudySpot studySpotObject = new StudySpot(name, address, college, hours);
        studyspots.put(name, studySpotObject);
        }

        return studyspots;

    }
}
