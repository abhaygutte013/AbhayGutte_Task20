// EmailJS Public Key
(function () {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

let cart = [];
let total = 0;

// Add Item
function addItem(service, price) {

    let item = {
        name: service,
        price: price
    };

    cart.push(item);

    displayCart();
}

// Display Cart
function displayCart() {

    let table = document.getElementById("cartTable");

    table.innerHTML = "";

    total = 0;

    for (let i = 0; i < cart.length; i++) {

        total += cart[i].price;

        table.innerHTML += `

        <tr>

            <td>${i + 1}</td>

            <td>${cart[i].name}</td>

            <td>₹${cart[i].price}</td>

            <td>
                <button class="remove-btn"
                onclick="removeItem(${i})">
                Remove
                </button>
            </td>

        </tr>

        `;

    }

    document.getElementById("total").innerHTML = total;

}

// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    displayCart();

}

// Booking Form

document.getElementById("bookingForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;

    let email = document.getElementById("email").value;

    let phone = document.getElementById("phone").value;

    if (cart.length == 0) {

        alert("Please add at least one service.");

        return;

    }

    let serviceList = "";

    for (let i = 0; i < cart.length; i++) {

        serviceList += cart[i].name + ", ";

    }

    let templateParams = {

        customer_name: name,

        customer_email: email,

        customer_phone: phone,

        services: serviceList,

        total_amount: total

    };

    emailjs.send(

        "YOUR_SERVICE_ID",

        "YOUR_TEMPLATE_ID",

        templateParams

    )

    .then(function () {

        document.getElementById("message").innerHTML =
        "Booking Successful!";

        cart = [];

        total = 0;

        displayCart();

        document.getElementById("bookingForm").reset();

    })

    .catch(function () {

        alert("Something went wrong.");

    });

});