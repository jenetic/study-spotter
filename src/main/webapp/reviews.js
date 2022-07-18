
// Helper methods for form error handling

/**
 * Checks if string is empty (whitespace counts as empty)
 */
const isEmpty = str => {
    return !str.trim().length;
}

/**
 * Checks if a string is a number between start and end, inclusive
 */
const isNumberBetween = (str, start, end) => {
    if (str == "" || str < start || str > end || !(!isNaN(str) && !isNaN(parseFloat(str)))) {
        return false;
    }
    return true;
}

/**
 * Submits form and does POST request to datastore
 */
const submitReview = () => {

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const description = document.getElementById("description").value;

    // // Get location and college elements
    const locationElement = document.getElementById("location-name").value;
    const collegeElement = document.getElementById("college-name").value;

    const errorMessageElement = document.getElementById("error-message");

    // Show error message if any field is empty
    if (isEmpty(name) || isEmpty(rating) || isEmpty(description)) {
        errorMessageElement.textContent = "Input fields cannot be empty.";
        return;
    }

    // Show error message if rating is a number between 0 and 5
    if (!isNumberBetween(rating, 0, 5)) {
        errorMessageElement.textContent = "Rating must be a number between 0 and 5.";
        return;
    }

    // Call SubmitReviewServlet
    document.getElementById('review-submission-form').action = '/submit-review';
    document.getElementById('review-submission-form').method = 'POST';
    document.getElementById('review-submission-form').submit();
}

/**
 * Loads reviews onto DOM
 */
const loadReviews = async (location, college) => {

    if (location != null) {
        localStorage.setItem('location', location);
        localStorage.setItem('college', college);
    }

    // Fetch data and convert to JSON
    const response = await fetch('/display-reviews');
    const reviewList = await response.json();

    const reviewsLocation = document.getElementById("review-list");
    reviewList.forEach((review) => {
        if (review.location === localStorage.getItem('location') && review.college === localStorage.getItem('college')) {
            reviewsLocation.appendChild(createReviewElement(review));
        } else {
            console.log(review);
        }
    });
    
    // If page is refreshed, location (function's argument) would be null since loadReviews() is called on load
    // so use info from local storage and don't set a new one
    document.getElementById("location-name").value = localStorage.getItem('location');
    document.getElementById("college-name").value = localStorage.getItem('college');
}

/**
 * Convert unix timestamp to date in form mm/dd/yyyy
 */
const timestampToDate = timestamp => {
    const date = new Date(timestamp);
    const month = parseInt(date.getMonth()) + 1;
    return month + "/" + date.getDate() + "/" + date.getFullYear();
}

/**
 * Creates element that represents a review
 * @param {Review}
 * @return {Element}
 */
const createReviewElement = (review) => {
    const { timestamp, name, rating, description } = review;

    const reviewElement = document.createElement('div');
    const ratingElement = document.createElement('h3');
    const nameElement = document.createElement('p');
    const dateElement = document.createElement('span');
    const descriptionElement = document.createElement('p');

    ratingElement.textContent = rating + " / 5 Stars";
    nameElement.textContent = name;
    dateElement.textContent = ' at ' + timestampToDate(timestamp);
    descriptionElement.textContent = description;

    nameElement.appendChild(dateElement);
    reviewElement.appendChild(ratingElement);
    reviewElement.appendChild(nameElement);
    reviewElement.appendChild(descriptionElement);

    return reviewElement;
}

window.onload = loadReviews();