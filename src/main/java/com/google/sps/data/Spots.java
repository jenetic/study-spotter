import com.google.gson.Gson;
import java.util;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

source = "studyspots.json"

class StudySpot{
  """
  Class for a single study spot, e.g. Uris Library
  """
  private String name;
  private String address;
  private String college;
  private List<String> hours;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCollege() {
    return college;
  }

  public void setCollege(String college) {
    this.college = name;
  }

  public List<String> getHours() {
    return hours;
  }

  public void setHours(List<String> hours) {
    this.hours = hours;
  }
}

class StudySpots implements Iterable<StudySpot> {
  """
  Class for all the study spots
  """
  List<StudySpot> studyspots;

  public List<StudySpot> getStudySpots() {
    return studyspots;
  }

  public void setHours(List<StudySpot> studyspots) {
    this.studyspots = studyspots;
  }

  @Override
    public Iterator<StudySpot> iterator() {
        return studyspots.iterator();
    }

}

class Utils {
  """
  Class for handling studyspot objects
  """
  HashMap<String, StudySpot> studyspots;

  HashMap<String, StudySpot> convert_to_hashmap(StudySpots studyspots) {
    HashMap<String, StudySpot> studyspots_hashmap = new HashMap<>();
    
    for (spot : studyspots) {
      studyspots_hashmap.put(spot.getName(), spot)
    }

    return studyspots_hashmap;
  }

  public static void main(String[] args) {

        Gson gson = new Gson();

        try (Reader reader = new FileReader(source)) {

          // Convert JSON File to Java Object
          StudySpots studyspots_from_json = gson.fromJson(reader, StudySpots.class);
			
			    // set studyspots
          // convert to hashmap for easier retrieval later on
          this.studyspots = convert_to_hashmap(studyspots_from_json);

        } catch (IOException e) {
          System.out.println("500 Internal Server Error");
        }
    }

  StudySpot get_studyspot_from_name(String name) {
    """
    Given a name, return the StudySpot object associated with 
    """
    return studyspots.get(name);
  }

  // Add more helper functions as needed here
}