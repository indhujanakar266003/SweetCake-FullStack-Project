// ===============================
// APPLY OFFER
// ===============================

function applyOffer(coupon) {

    alert(
        "Coupon " + coupon +
        " applied successfully! 🎉"
    );

}


// ===============================
// REMOVE FROM WISHLIST
// ===============================

function removeWishlist(button, cakeName) {

    const confirmRemove =
        confirm(
            "Remove " + cakeName +
            " from your wishlist?"
        );


    if (confirmRemove) {

        button
            .closest(".wishlist-card")
            .remove();

        alert(
            cakeName +
            " removed from wishlist! ❤️"
        );

    }

}


// ===============================
// VIEW ALL OFFERS
// ===============================

function viewOffers() {

    alert(
        "All available offers will be displayed here! 🎁"
    );

}


// ===============================
// VIEW WISHLIST
// ===============================

function viewWishlist() {

    alert(
        "Your wishlist is opened! ❤️"
    );

}