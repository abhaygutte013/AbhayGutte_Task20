let username = localStorage.getItem("username");

if (username == null || username == "") {

    username = prompt("Enter your name");

    if (username == null || username == "") {
        username = "Guest";
    }

    localStorage.setItem("username", username);
}

document.getElementById("userBtn").innerHTML = username;

emailjs.init("B_8FKSP9Vcn9gS-bt");

let serviceID = "service_mrgn9bs";
let bookingTemplate = "template_agoz8sp";
let newsletterTemplate = "template_fafj74a";

let cart = [];
let total = 0;

window.onload = function () {

    let data = localStorage.getItem("cart");

    if (data != null) {

        cart = JSON.parse(data);

        updateCart();
    }

};

function addItem(name, price) {

    let item = {
        name: name,
        price: price
    };

    cart.push(item);

    saveCart();

    updateCart();

}

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

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

function clearCart() {

    cart = [];

    saveCart();

    updateCart();

}
let bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();

    let email = document.getElementById("email").value.trim();

    let phone = document.getElementById("phone").value.trim();

    let message = document.getElementById("message");

    if (name == "") {

        alert("Please enter your name.");
        return;

    }

    if (email == "") {

        alert("Please enter your email.");
        return;

    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (emailPattern.test(email) == false) {

        alert("Please enter a valid email.");
        return;

    }

    if (phone == "") {

        alert("Please enter your phone number.");
        return;

    }

    let phonePattern = /^[0-9]{10}$/;

    if (phonePattern.test(phone) == false) {

        alert("Enter a valid 10 digit phone number.");
        return;

    }

    if (cart.length == 0) {

        alert("Please add at least one laundry service.");
        return;

    }

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

        serviceID,
        bookingTemplate,
        details

    )

    .then(function () {

        message.style.color = "green";

        message.innerHTML =
        "Booking Successful! We will contact you soon.";

        alert("Booking Successful!");

        bookingForm.reset();

        clearCart();

    })

    .catch(function () {

        message.style.color = "red";

        message.innerHTML =
        "Unable to send booking email.";

        alert("Something went wrong.");

    });

});
let subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.addEventListener("click", function () {

    let email = document.getElementById("newsletterEmail").value.trim();

    let msg = document.getElementById("subscribeMessage");

    if (email == "") {

        msg.innerHTML = "Please enter your email.";
        msg.style.color = "red";
        return;

    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (emailPattern.test(email) == false) {

        msg.innerHTML = "Please enter a valid email.";
        msg.style.color = "red";
        return;

    }

    let details = {

        email: email

    };

    msg.style.color = "orange";
    msg.innerHTML = "Subscribing...";

    emailjs.send(

        serviceID,
        newsletterTemplate,
        details

    )

    .then(function () {

        msg.style.color = "green";

        msg.innerHTML = "Subscription Successful!";

        document.getElementById("newsletterEmail").value = "";

    })

    .catch(function () {

        msg.style.color = "red";

        msg.innerHTML = "Unable to subscribe.";

    });

});

let links = document.querySelectorAll("nav a");

for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function (event) {

        let target = this.getAttribute("href");

        if (target.startsWith("#")) {

            event.preventDefault();

            let section = document.querySelector(target);

            if (section != null) {

                section.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }

    });

}
