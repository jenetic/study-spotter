/**
 * Loads locations onto DOM
 */
const getLocations = async (location) => {
    console.log("Test")
    // Fetch data and convert to JenSON
    const response = await fetch('/GetLocations');
    const locationList = await response.json();
    const locationSegment = document.getElementById("card-collection");
    console.log(locationSegment)
    console.log(locationList)
    
    locationList.forEach((location) => {
        console.log("YYY")
        console.log(location)
        console.log("#"+location.college)
        console.log(window.location.hash)
        if("#"+location.college.toUpperCase() == (window.location.hash.toUpperCase()))
        {
            locationSegment.appendChild(createLocationElement(location));
            locationSegment.appendChild(document.createElement("br"));
        }
        
    });
    
    // Update reviews to display location

    /*
    // If page is refreshed, location would be null, so use info from local storage and don't set a new one
    if (location != null) {
        localStorage.setItem('location', location);
        console.log("location is not null");
    }
    
    document.getElementById("location-name").textContent = localStorage.getItem('location');
    */
}


const createLocationElement = (location) =>
{
    console.log("EEE");
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
    console.log("LLL")
    console.log(name)
    console.log(college)
    console.log(card);
    return card;
    

    console.log(location)
}

function temp(){
    console.log("Temp")
}


window.onload = getLocations();

