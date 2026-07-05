// EmailJS

emailjs.init("B_8FKSP9Vcn9gS-bt");

// Variables

let cart = [];
let total = 0;

// Load cart when page opens

window.onload = function () {

    let data = localStorage.getItem("cart");

    if (data != null) {

        cart = JSON.parse(data);

        updateCart();

    }

};

// Add Item

function addItem(name, price) {

    let item = {
        name: name,
        price: price
    };

    cart.push(item);

    saveCart();

    updateCart();

}

// Update Cart

function updateCart() {

    let table = document.getElementById("cartTable");

    let totalText = document.getElementById("total");

    table.innerHTML = "";

    total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price;

        table.innerHTML +=

        "<tr>" +

        "<td>" + (i + 1) + "</td>" +

        "<td>" + cart[i].name + "</td>" +

        "<td>₹" + cart[i].price + "</td>" +

        "<td><button class='remove-btn' onclick='removeItem(" + i + ")'>Remove</button></td>" +

        "</tr>";

    }

    totalText.innerHTML = total;

}

// Remove Item

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}

// Save Cart

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// Clear Cart

function clearCart() {

    cart = [];

    saveCart();

    updateCart();

}
// Booking Form

document.getElementById("bookingForm").onsubmit = function (event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();

    let email = document.getElementById("email").value.trim();

    let phone = document.getElementById("phone").value.trim();

    let message = document.getElementById("message");

    // Check Name

    if (name == "") {

        alert("Please enter your name.");

        return;

    }

    // Check Email

    if (email == "") {

        alert("Please enter your email.");

        return;

    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (emailPattern.test(email) == false) {

        alert("Please enter a valid email.");

        return;

    }

    // Check Phone

    if (phone == "") {

        alert("Please enter your phone number.");

        return;

    }

    let phonePattern = /^[0-9]{10}$/;

    if (phonePattern.test(phone) == false) {

        alert("Phone number must contain 10 digits.");

        return;

    }

    // Check Cart

    if (cart.length == 0) {

        alert("Please add at least one laundry service.");

        return;

    }

    // Service List

    let services = "";

    for (let i = 0; i < cart.length; i++) {

        services += cart[i].name;

        if (i != cart.length - 1) {

            services += ", ";

        }

    }

    let details = {

        customer_name: name,

        customer_email: email,

        customer_phone: phone,

        services: services,

        total_amount: total

    };

    message.style.color = "orange";

    message.innerHTML = "Sending Booking...";

    emailjs.send(

        "service_mrgn9bs",

        "template_agoz8sp",

        details

    )

    .then(function () {

        message.style.color = "green";

        message.innerHTML =
        "Thank You! Your booking has been placed successfully. We will contact you soon.";

        alert("Booking Successful!");

        document.getElementById("bookingForm").reset();

        clearCart();

    })

    .catch(function () {

        message.style.color = "red";

        message.innerHTML =
        "Email could not be sent. Please try again.";

        alert("Something went wrong.");

    });

};
