/**
 * Loads locations onto DOM
 */
const getLocations = async (location) => {
    console.log("Test")
    // Fetch data and convert to JSON
    const response = await fetch('/GetLocations');
    const reviewList = await response.json();
    const reviewsLocation = document.getElementById("card-collection");
    console.log(reviewsLocation)
    console.log(reviewList)
    
    reviewList.forEach((location) => {
        console.log("YYY")
        console.log(location)
        reviewsLocation.appendChild(createLocationElement(location));
        reviewsLocation.appendChild(document.createElement("br"));
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
    const {description, name, time} = location;

    const card = document.createElement("div" );
    card.setAttribute("class", "card") 
    const header = document.createElement('h3');
    const blurb = document.createElement('p');
    const desc = document.createElement('p');

    header.textContent = name;
    blurb.textContent = time;
    desc.textContent = description;

    card.appendChild(header);
    card.appendChild(blurb);
    card.appendChild(desc);

    console.log(card);

    return card;
    

    console.log(location)
}



window.onload = getLocations();

