const loadReviews = async () => {
    // Fetch data
    const response = await fetch('/display-reviews');
    
    // Convert data to JSON
    const reviewList = await response.json();
    // console.log(reviewList);

    const reviewElement = document.getElementById("review-list");

    reviewList.forEach((review) => {
        const pElement = document.createElement('p');
        pElement.textContent = review;
        reviewElement.appendChild(pElement);
    });
}