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
    const { rating, description } = review;

    const reviewElement = document.createElement('div');
    const ratingElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    ratingElement.textContent = rating + " / 5 Stars";
    descriptionElement.textContent = description;
    reviewElement.appendChild(ratingElement);
    reviewElement.appendChild(descriptionElement);

    return reviewElement;
}