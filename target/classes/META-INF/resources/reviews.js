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