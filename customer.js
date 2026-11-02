// ===============================
// CHANGE PROFILE PHOTO
// ===============================

function changePhoto() {

    document.getElementById("photoInput").click();
}


document.getElementById("photoInput")
    .addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function (e) {

                document.getElementById("profileImage").src =
                    e.target.result;
            };

            reader.readAsDataURL(file);
        }
    });


// ===============================
// ADD NEW ADDRESS
// ===============================

// ===============================
// OPEN ADD ADDRESS
// ===============================

function addAddress() {

    document.getElementById("addressModal").style.display = "flex";
}


// ===============================
// CLOSE ADD ADDRESS
// ===============================

function closeAddressModal() {

    document.getElementById("addressModal").style.display = "none";
}


// ===============================
// SAVE NEW ADDRESS
// ===============================

function saveNewAddress() {

    const type =
        document.getElementById("addressType").value;

    const name =
        document.getElementById("addressName").value.trim();

    const address =
        document.getElementById("newAddress").value.trim();

    const city =
        document.getElementById("addressCity").value.trim();

    const pincode =
        document.getElementById("addressPincode").value.trim();

    const phone =
        document.getElementById("addressPhone").value.trim();


    // CHECK DETAILS

    if (
        type === "" ||
        name === "" ||
        address === "" ||
        city === "" ||
        pincode === "" ||
        phone === ""
    ) {

        alert("Please fill all address details.");

        return;
    }


    // CREATE NEW ADDRESS CARD

    const addressSection =
        document.querySelector(".address-section");


    const newCard =
        document.createElement("div");

    newCard.className = "address-card";


    newCard.innerHTML = `

        <strong>${type}</strong>

        <p>
            ${name}<br>
            ${address}<br>
            ${city} - ${pincode}<br>
            ${phone}
        </p>

        <div class="address-actions">

            <i
                class="bi bi-pencil"
                onclick="editAddress('${type}')"
            ></i>

            <i
                class="bi bi-trash"
                onclick="deleteAddress(this)"
            ></i>

        </div>
    `;


    // Add before last content
    addressSection.appendChild(newCard);


    // CLOSE MODAL

    closeAddressModal();


    // CLEAR FORM

    document.getElementById("addressType").value = "";

    document.getElementById("addressName").value = "";

    document.getElementById("newAddress").value = "";

    document.getElementById("addressCity").value = "";

    document.getElementById("addressPincode").value = "";

    document.getElementById("addressPhone").value = "";


    alert("Address saved successfully! 🎉");
}


// ===============================
// EDIT ADDRESS
// ===============================

function editAddress(name) {

    alert(
        "Edit Address\n\n" +
        "Editing " + name + " address."
    );
}


// ===============================
// DELETE ADDRESS
// ===============================

function deleteAddress(element) {

    const confirmDelete =
        confirm("Are you sure you want to delete this address?");

    if (confirmDelete) {

        element.closest(".address-card").remove();

        alert("Address deleted successfully.");
    }
}

// ===============================
// SAVE PROFILE INFORMATION
// ===============================

function saveProfile() {

    alert("Your information saved successfully! 🎉");
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("dob").value = "";
}