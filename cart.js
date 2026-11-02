
document.addEventListener("DOMContentLoaded", function () {

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let discount = 0;
    const deliveryCharge = 50;

    const cartContainer = document.querySelector(".cart-section");

    // Cart items display
    function displayCart() {

        const oldItems = document.querySelectorAll(".dynamic-cart-item");
        oldItems.forEach(item => item.remove());

        const cartHead = document.querySelector(".cart-head");

        if (cartItems.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "dynamic-cart-item";
            emptyMessage.innerText = "Your cart is empty!";
            cartHead.after(emptyMessage);
        } else {

            cartItems.forEach((item, index) => {

                const cartItem = document.createElement("div");
                cartItem.className = "cart-item dynamic-cart-item";

                cartItem.innerHTML = `
                    <img src="choco.png" alt="Cake">

                    <div class="item-name">
                        <strong>${item.name}</strong>
                        <small>Best Seller</small>
                    </div>

                    <div class="quantity">
                        <button type="button" class="minus">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" class="plus">+</button>
                    </div>

                    <strong>₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>

                   <button type="button" class="remove-item"
    style="
        border: none;
        background: #ffe5ed;
        color: #e7195f;
        border-radius: 5px;
        padding: 5px 8px;
        cursor: pointer;
        font-size: 16px;
    ">
    <i class="bi bi-trash"></i>
</button>
                `;

                cartHead.after(cartItem);

                cartItem.querySelector(".plus").addEventListener("click", function () {
                    cartItems[index].quantity++;
                    saveAndUpdate();
                });

                cartItem.querySelector(".minus").addEventListener("click", function () {
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity--;
                    }
                    saveAndUpdate();
                });

                cartItem.querySelector(".remove-item").addEventListener("click", function () {
                    cartItems.splice(index, 1);
                    saveAndUpdate();
                });

            });
        }

        updatePrice();
    }


    // Price calculation
    function updatePrice() {

        let subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        let total = subtotal - discount;

        if (cartItems.length > 0) {
            total += deliveryCharge;
        }

        document.getElementById("subtotal").innerText =
            subtotal.toLocaleString("en-IN");

        document.getElementById("discount").innerText =
            discount.toLocaleString("en-IN");

        document.getElementById("totalAmount").innerText =
            total.toLocaleString("en-IN");
    }


    // Save cart
    function saveAndUpdate() {

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        displayCart();
    }


    // Coupon
    window.applyCoupon = function () {

        let coupon = document.getElementById("coupon").value
            .trim().toUpperCase();

        if (coupon === "CAKE100") {
            discount = 100;
            alert("🎉 CAKE100 applied! ₹100 discount added.");
        }
        else if (coupon === "WELCOME50") {
            discount = 50;
            alert("🎉 WELCOME50 applied! ₹50 discount added.");
        }
        else {
            discount = 0;
            alert("❌ Invalid Coupon Code!");
        }

        updatePrice();
    };


    // Place order
    
window.placeOrder = async function () {

    let name = document.getElementById("fullName").value.trim();
    let address = document.getElementById("address1").value.trim();
    let address2 = document.getElementById("address2").value.trim();
    let city = document.getElementById("city").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!name || !address || !city || !pincode || !phone) {
        alert("Please fill all address details.");
        return;
    }

    let payment = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    let subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    let finalAmount = subtotal - discount + deliveryCharge;

    let cakeDetails = cartItems.map(item =>
        `${item.name} x ${item.quantity}`
    ).join(", ");

   const orderData = {
    customer: name,
    items: cakeDetails,
    amount: finalAmount,
    status: "Pending",
    orderDate: new Date().toISOString().slice(0, 10),

    deliveryAddress: [address, address2]
        .filter(Boolean)
        .join(", "),
    city: city,
    pincode: pincode,
    phone: phone,
    paymentMethod: payment,
    instructions:
        document.getElementById("instructions")?.value.trim() || ""
};

    try {

      const response = await fetch(
    "http://localhost:8080/api/orders",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    }
);

        if (!response.ok) {
            throw new Error("Order could not be saved");
        }

        const savedOrder = await response.json();

        alert(
            "ORDER PLACED SUCCESSFULLY!\n\n" +
            "Order ID: " + savedOrder.id + "\n" +
            "Customer: " + name + "\n" +
            "Cakes: " + cakeDetails + "\n" +
            "Payment: " + payment + "\n" +
            "Total: ₹" + finalAmount
        );

        cartItems = [];
        localStorage.removeItem("cartItems");

        window.location.reload();

    } catch (error) {

        console.error("Order Error:", error);

        alert(
            "Order failed! Please check whether Spring Boot is running."
        );
    }
};
    // Initial display
    displayCart();

});