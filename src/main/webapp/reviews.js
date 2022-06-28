/**
 * Loads reviews onto DOM
 */
const loadReviews = async () => {
    // Fetch data and convert to JSON
    const response = await fetch('/display-reviews');
    const reviewList = await response.json();

    // console.log(reviewList);

    const reviewsLocation = document.getElementById("review-list");
    reviewList.forEach((review) => {
        reviewsLocation.appendChild(createReviewElement(review));
    });
}

/**
 * Creates element that represents a review
 * @param {Review}
 */
const createReviewElement = (review) => {
    const { rating, description } = review;

    const reviewElement = document.createElement('div');
    const ratingElement = document.createElement('h2');
    const descriptionElement = document.createElement('p');
    ratingElement.textContent = rating + " Stars";
    descriptionElement.textContent = description;
    reviewElement.appendChild(ratingElement);
    reviewElement.appendChild(descriptionElement);

    return reviewElement;
}