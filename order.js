// ===============================
// TRACK ORDER
// ===============================

function trackOrder() {

    const orderId =
        document.getElementById("orderId")
        .value
        .trim()
        .toUpperCase();


    if (orderId === "") {

        alert("Please enter your Order ID.");

        return;
    }


    if (
        orderId === "CD12345" ||
        orderId === "CD12344" ||
        orderId === "CD12343"
    ) {

        alert(
            "Order Found! 🎉\n\n" +
            "Order ID: " + orderId + "\n" +
            "Your order is being tracked."
        );

    }

    else {

        alert(
            "❌ Order not found!\n\n" +
            "Please check your Order ID."
        );

    }
}


// ===============================
// VIEW ALL ORDERS
// ===============================

function viewAllOrders() {

    alert(
        "📦 My Orders\n\n" +
        "You have 3 recent orders."
    );

}