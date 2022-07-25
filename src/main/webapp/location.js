/**
 * Loads locations onto DOM
 */
const getLocations = async (college, map) => {

    if (college != null) {
        localStorage.setItem('location-college', college);
        localStorage.setItem('location-map', map);
    }

    // Fetch data and convert to JSON
    const response = await fetch('/GetLocations');
    const locationList = await response.json();
    const locationSegment = document.getElementById("card-collection");
    
    locationList.forEach((location) => {
        if (location.college === localStorage.getItem("location-college")) {
            locationSegment.appendChild(createLocationElement(location));
            locationSegment.appendChild(document.createElement("br"));
        }
    });
    document.getElementById("map").src = localStorage.getItem("location-map");
    document.getElementById("location-college-name").textContent = localStorage.getItem("location-college");
}

const createLocationElement = (location) => {
    const {description, name, time, college} = location;

    const card = document.createElement("div" );
    card.setAttribute("class", "card") 
    const header = document.createElement('h3');
    const link = document.createElement('a');
    const blurb = document.createElement('p');
    const desc = document.createElement('p');

    link.textContent = name;

    link.href = "#reviews"
    link.onclick = function() {loadReviews(name, college)};

    header.appendChild(link)
    card.appendChild(header);

    blurb.textContent = time;
    desc.textContent = description
    card.appendChild(header);
    card.appendChild(blurb);
    card.appendChild(desc);
    return card;
}

window.onload = getLocations();

