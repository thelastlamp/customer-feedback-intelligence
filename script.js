// STORE SUBMITTED CUSTOMER REVIEWS

let submittedReviews = [];

// GET HTML ELEMENTS

const reviewInput = document.getElementById("reviewInput");
const reviewCount = document.getElementById("reviewCount");
const inputError = document.getElementById("inputError");
const analyseButton = document.getElementById("analyseButton");

const inputScreen = document.getElementById("inputScreen");
const dashboardScreen = document.getElementById("dashboardScreen");

const backToReviews = document.getElementById("backToReviews");


// COUNT REVIEWS AS THE USER TYPES

reviewInput.addEventListener("input", function () {

    const reviews = reviewInput.value
        .split("\n")
        .map(review => review.trim())
        .filter(review => review !== "");

    const count = reviews.length;

    reviewCount.textContent =
        count + (count === 1 ? " review entered" : " reviews entered");

    inputError.textContent = "";

});

// DISPLAY SUBMITTED REVIEWS ON THE DASHBOARD

function displayReviews(reviews) {

    // CLEAR PREVIOUS REVIEW CONTENT

    reviewEvidenceList.innerHTML = "";

    // DISPLAY EACH SUBMITTED REVIEW

    reviews.forEach(function (review) {

        const reviewItem = document.createElement("article");

        reviewItem.className = "review-item";

        const reviewText = document.createElement("p");

        reviewText.textContent = review;

        reviewItem.appendChild(reviewText);

        reviewEvidenceList.appendChild(reviewItem);

    });

}

// HANDLE THE ANALYSE BUTTON

analyseButton.addEventListener("click", function () {

    const reviews = reviewInput.value
        .split("\n")
        .map(review => review.trim())
        .filter(review => review !== "");

    if (reviews.length === 0) {

        inputError.textContent =
            "Please enter at least one customer review before continuing.";

        reviewInput.focus();
        return;

    }

    inputError.textContent = "";

    submittedReviews = reviews;

    displayReviews(submittedReviews);

    history.pushState({ screen: "dashboard" }, "");

    // SWITCH TO THE DASHBOARD

    inputScreen.style.display = "none";
    dashboardScreen.style.display = "flex";

    window.scrollTo(0, 0);

});

// RETURN TO THE REVIEW INPUT SCREEN

backToReviews.addEventListener("click", function () {

    history.back();

    dashboardScreen.style.display = "none";
    inputScreen.style.display = "flex";

    window.scrollTo(0, 0);

});

// HANDLE BROWSER BACK AND FORWARD BUTTONS

window.addEventListener("popstate", function (event) {

    if (event.state && event.state.screen === "dashboard") {

        inputScreen.style.display = "none";
        dashboardScreen.style.display = "flex";

    } else {

        dashboardScreen.style.display = "none";
        inputScreen.style.display = "flex";

    }

    window.scrollTo(0, 0);

});