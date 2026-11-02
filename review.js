// ===============================
// RATING
// ===============================

let selectedRating = 4;

function setRating(rating) {

    selectedRating = rating;

    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {

        if (index < rating) {
            star.innerHTML = "★";
        } else {
            star.innerHTML = "☆";
        }

    });
}


// ===============================
// REVIEW CHARACTER COUNT
// ===============================

function updateReviewCount() {

    const review =
        document.getElementById("reviewText").value;

    document.getElementById("reviewCount").innerText =
        review.length;
}


// ===============================
// MESSAGE CHARACTER COUNT
// ===============================

function updateMessageCount() {

    const message =
        document.getElementById("contactMessage").value;

    document.getElementById("messageCount").innerText =
        message.length;
}


// ===============================
// SUBMIT REVIEW
// ===============================

function submitReview() {

    const orderId =
        document.getElementById("reviewOrderId").value.trim();

    const review =
        document.getElementById("reviewText").value.trim();


    if (orderId === "") {

        alert("Please enter your Order ID.");
        return;

    }


    if (review === "") {

        alert("Please write your review.");
        return;

    }


    // Alert
    alert("Review submitted successfully! ⭐");


    // Alert OK click pannina form clear
    document.getElementById("reviewOrderId").value = "";
    document.getElementById("reviewText").value = "";

    // Character count reset
    document.getElementById("reviewCount").innerText = "0";


    // Rating reset
    selectedRating = 0;

    const stars = document.querySelectorAll(".star");

    stars.forEach((star) => {
        star.innerHTML = "☆";
    });

}


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    if (name === "") {

        alert("Please enter your name.");
        return;

    }


    if (email === "") {

        alert("Please enter your email.");
        return;

    }


    if (message === "") {

        alert("Please enter your message.");
        return;

    }


    // Alert
    alert("Your message has been sent successfully! 📩");


    // Alert OK click pannina clear
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactSubject").selectedIndex = 0;
    document.getElementById("contactMessage").value = "";


    // Character count reset
    document.getElementById("messageCount").innerText = "0";

}