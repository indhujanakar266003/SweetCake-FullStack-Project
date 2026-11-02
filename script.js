document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // SIZE & TOPPING PRICE
    // =========================

    const size = document.getElementById("size");
    const toppings = document.querySelectorAll(".topping");
    const totalPrice = document.getElementById("totalPrice");


    function calculatePrice() {

        let price = Number(size.value);

        toppings.forEach(function (item) {

            if (item.checked) {
                price += Number(item.value);
            }

        });

        totalPrice.innerText =
            price.toLocaleString("en-IN");
    }


    // SIZE CHANGE

    size.addEventListener("change", calculatePrice);


    // TOPPING CHANGE

    toppings.forEach(function (item) {

        item.addEventListener("change", calculatePrice);

    });


    // Initial price

    calculatePrice();


    // =========================
    // MESSAGE CHARACTER COUNT
    // =========================

    const message = document.getElementById("message");
    const count = document.getElementById("count");


    message.addEventListener("input", function () {

        count.innerText = this.value.length;

    });


    // =========================
    // ADD TO CART
    // =========================

  window.addToCart = function () {
    const flavour = document.getElementById("flavour").value;
    const sizeSelect = document.getElementById("size");
    const message = document.getElementById("message").value;

    const selects = document.querySelectorAll(".form-select");
    const shape = selects[2].value;
    const theme = selects[3].value;

    const toppings = [];

    document.querySelectorAll(".topping:checked").forEach(function (item) {
        toppings.push(item.nextElementSibling.innerText.trim());
    });

    const cakeOrder = {
        cakeName: flavour + " Cake",
        flavour: flavour,
        size: sizeSelect.options[sizeSelect.selectedIndex].text,
        shape: shape,
        theme: theme,
        toppings: toppings,
        message: message,
        price: Number(document.getElementById("totalPrice").innerText.replace(/,/g, ""))
    };

    localStorage.setItem("customCakeOrder", JSON.stringify(cakeOrder));

    window.location.href = "cart&checkout.html";
};

});