
emailjs.init("xyz");

// Array to store services
var cart = [];

// Total amount
var total = 0;

// When page opens
window.onload = function () {

    // Get saved cart
    var data = localStorage.getItem("laundryCart");

    if (data != null) {

        cart = JSON.parse(data);

        showCart();

    }

};

// Function to add service
function addItem(name, price) {

    var item = [];

    item[0] = name;
    item[1] = price;

    cart.push(item);

    saveCart();

    showCart();

}

// Function to display cart
function showCart() {

    var table = document.getElementById("cartTable");

    table.innerHTML = "";

    total = 0;

    for (var i = 0; i < cart.length; i++) {

        total = total + cart[i][1];

        table.innerHTML +=

        "<tr>" +

        "<td>" + (i + 1) + "</td>" +

        "<td>" + cart[i][0] + "</td>" +

        "<td>₹" + cart[i][1] + "</td>" +

        "<td>" +

        "<button class='remove-btn' onclick='removeItem(" + i + ")'>" +

        "Remove" +

        "</button>" +

        "</td>" +

        "</tr>";

    }

    document.getElementById("total").innerHTML = total;

}

// Function to remove item
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    showCart();

}

// Save cart in browser
function saveCart() {

    localStorage.setItem("laundryCart", JSON.stringify(cart));

}

// Empty cart
function clearCart() {

    cart = [];

    saveCart();

    showCart();

}
// ----------------------------
// Booking Form
// ----------------------------

document.getElementById("bookingForm").onsubmit = function(event){

    event.preventDefault();

    // Get values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Check name
    if(name == ""){

        alert("Please enter your name.");

        return;

    }

    // Check email
    if(email == ""){

        alert("Please enter your email.");

        return;

    }

    // Email validation
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(emailPattern.test(email) == false){

        alert("Please enter a valid email.");

        return;

    }

    // Check phone
    if(phone == ""){

        alert("Please enter your phone number.");

        return;

    }

    // Phone validation
    var phonePattern = /^[0-9]{10}$/;

    if(phonePattern.test(phone) == false){

        alert("Phone number should contain exactly 10 digits.");

        return;

    }

    // Check cart
    if(cart.length == 0){

        alert("Please add at least one service.");

        return;

    }

    // Create service list
    var serviceList = "";

    for(var i = 0; i < cart.length; i++){

        serviceList = serviceList + cart[i][0];

        if(i != cart.length - 1){

            serviceList = serviceList + ", ";

        }

    }

    // EmailJS Data
    var details = {

        customer_name: name,

        customer_email: email,

        customer_phone: phone,

        services: serviceList,

        total_amount: total

    };

    // Send Email

    emailjs.send(

        "ID",

        "Template_ID",

        details

    ).then(function(){

        document.getElementById("message").innerHTML =
        "Booking Successful!";

        alert("Booking Successful!");

        // Clear form
        document.getElementById("bookingForm").reset();

        // Empty cart
        clearCart();

    }).catch(function(){

        alert("Email could not be sent.");

    });

}
