emailjs.init("B_8FKSP9Vcn9gS-bt");

let serviceID = "service_mrgn9bs";
let bookingTemplate = "template_agoz8sp";
let newsletterTemplate = "template_fafj74a";

let username = localStorage.getItem("username");

if (username == null || username == "") {
    username = prompt("Enter Your Name");

    if (username == null || username == "") {
        username = "Guest";
    }

    localStorage.setItem("username", username);
}

document.getElementById("usernameBtn").innerHTML = username;

let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

let buttons = document.querySelectorAll(".addCart");

for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function () {

        let serviceName = this.dataset.name;
        let servicePrice = Number(this.dataset.price);

        let item = {
            name: serviceName,
            price: servicePrice
        };

        cart.push(item);

        saveCart();

        updateCart();

        alert(serviceName + " Added Successfully");

    });

}

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

function updateCart() {

    let table = document.getElementById("cartTable");

    table.innerHTML = "";

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price;

        let row = document.createElement("tr");

        row.innerHTML =
            "<td>" + cart[i].name + "</td>" +
            "<td>₹" + cart[i].price + "</td>" +
            "<td><button onclick='removeItem(" + i + ")'>Remove</button></td>";

        table.appendChild(row);

    }

    document.getElementById("cartCount").innerHTML = cart.length;

    document.getElementById("totalPrice").innerHTML =
        "Total : ₹" + total;

}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}

document.getElementById("clearCart").addEventListener("click", function () {

    let check = confirm("Clear Cart ?");

    if (check) {

        cart = [];

        saveCart();

        updateCart();

    }

});

updateCart();

let links = document.querySelectorAll("nav a");

for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function (e) {

        e.preventDefault();

        let section = this.getAttribute("href");

        document.querySelector(section).scrollIntoView({

            behavior: "smooth"

        });

    });

}
let bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let service = document.getElementById("service").value;
    let date = document.getElementById("date").value;
    let message = document.getElementById("message").value.trim();

    if (name == "" || email == "" || phone == "" || address == "" || service == "" || date == "") {
        alert("Please Fill All Fields");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (emailPattern.test(email) == false) {
        alert("Invalid Email");
        return;
    }

    if (phone.length != 10) {
        alert("Enter Valid Mobile Number");
        return;
    }

    let details = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_address: address,
        user_service: service,
        pickup_date: date,
        user_message: message
    };

    emailjs.send(serviceID, bookingTemplate, details)

        .then(function () {

            alert("Booking Successful");

            bookingForm.reset();

        })

        .catch(function () {

            alert("Booking Failed");

        });

});

let subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.addEventListener("click", function () {

    let email = document.getElementById("newsletterEmail").value.trim();

    let msg = document.getElementById("newsletterMsg");

    if (email == "") {

        msg.innerHTML = "Enter Email";
        msg.style.color = "red";
        return;

    }

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (pattern.test(email) == false) {

        msg.innerHTML = "Invalid Email";
        msg.style.color = "red";
        return;

    }

    let data = {

        user_email: email

    };

    emailjs.send(serviceID, newsletterTemplate, data)

        .then(function () {

            msg.innerHTML = "Subscribed Successfully";
            msg.style.color = "green";

            document.getElementById("newsletterEmail").value = "";

        })

        .catch(function () {

            msg.innerHTML = "Subscription Failed";
            msg.style.color = "red";

        });

});

window.onload = function () {

    updateCart();

};
