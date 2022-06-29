/**
 * Submits form and does POST request to datastore
 */
const submitReview = () => {

    // Check if rating is a number between 0 and 5
    const ratingString = document.getElementById("rating").value;
    console.log("submitted");
    if (ratingString == "" || ratingString < 0 || ratingString > 5 || !(!isNaN(ratingString) && !isNaN(parseFloat(ratingString)))) {
        document.getElementById("error-message").style.display = 'block';
        console.log("error");
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
const loadReviews = async () => {
    // Fetch data and convert to JSON
    const response = await fetch('/display-reviews');
    const reviewList = await response.json();

    const reviewsLocation = document.getElementById("review-list");
    reviewList.forEach((review) => {
        reviewsLocation.appendChild(createReviewElement(review));
    });
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
    dateElement.textContent = ' at ' + timestamp;
    descriptionElement.textContent = description;

    nameElement.appendChild(dateElement);
    reviewElement.appendChild(ratingElement);
    reviewElement.appendChild(nameElement);
    reviewElement.appendChild(descriptionElement);

    return reviewElement;
}