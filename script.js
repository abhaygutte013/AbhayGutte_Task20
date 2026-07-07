
emailjs.init(EMAIL_PUBLIC_KEY);

let cart = [];

// Get username
let username = localStorage.getItem("username");

if (username == null) {
    username = prompt("Enter your name");

    if (username == "") {
        username = "Guest";
    }

    localStorage.setItem("username", username);
}

document.getElementById("userBtn").innerHTML = username;


// Add item into cart
function addItem(name, price) {

    let item = {};

    item.name = name;
    item.price = price;

    cart.push(item);

    showCart();
}


// Show cart items
function showCart() {

    let table = document.getElementById("cartTable");

    table.innerHTML = "";

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price;

        table.innerHTML +=
        "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        "<td>" + cart[i].name + "</td>" +
        "<td>₹" + cart[i].price + "</td>" +
        "<td><button onclick='removeItem(" + i + ")'>Remove</button></td>" +
        "</tr>";
    }

    document.getElementById("total").innerHTML = total;
}


// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    showCart();

}
// Booking form

let bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("message").innerHTML = "";

    let ok = true;

    if (name == "") {
        document.getElementById("nameError").innerHTML = "Enter your name";
        ok = false;
    }

    if (email == "") {
        document.getElementById("emailError").innerHTML = "Enter your email";
        ok = false;
    }

    if (phone == "") {
        document.getElementById("phoneError").innerHTML = "Enter mobile number";
        ok = false;
    }

    if (phone.length != 10) {
        document.getElementById("phoneError").innerHTML = "Enter 10 digit number";
        ok = false;
    }

    if (cart.length == 0) {
        document.getElementById("message").innerHTML = "Add at least one service";
        document.getElementById("message").style.color = "red";
        ok = false;
    }

    if (ok == false) {
        return;
    }

    let services = "";

    for (let i = 0; i < cart.length; i++) {

        services = services + cart[i].name;

        if (i != cart.length - 1) {
            services = services + ", ";
        }

    }

    let data = {

        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        services: services,
        total_price: document.getElementById("total").innerHTML

    };

    emailjs.send(SERVICE_ID, BOOKING_TEMPLATE, data)
        .then(function () {

            document.getElementById("message").innerHTML = "Booking Successful";
            document.getElementById("message").style.color = "green";

            bookingForm.reset();

            cart = [];

            showCart();

        });

});
// Newsletter

let subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.addEventListener("click", function () {

    let name = document.getElementById("newsletterName").value;
    let email = document.getElementById("newsletterEmail").value;

    document.getElementById("newsNameError").innerHTML = "";
    document.getElementById("newsEmailError").innerHTML = "";
    document.getElementById("subscribeMessage").innerHTML = "";

    let ok = true;

    if (name == "") {

        document.getElementById("newsNameError").innerHTML = "Enter your name";

        ok = false;
    }

    if (email == "") {

        document.getElementById("newsEmailError").innerHTML = "Enter your email";

        ok = false;
    }

    if (ok == false) {
        return;
    }

    let data = {

        user_name: name,
        user_email: email

    };

    emailjs.send(SERVICE_ID, NEWSLETTER_TEMPLATE, data)

    .then(function () {

        document.getElementById("subscribeMessage").innerHTML = "Subscribed Successfully";

        document.getElementById("subscribeMessage").style.color = "green";

        document.getElementById("newsletterName").value = "";

        document.getElementById("newsletterEmail").value = "";

    });

});
