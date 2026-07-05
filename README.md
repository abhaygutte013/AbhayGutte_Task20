# Laundry Service Website
## Project Name:Laundry Service Website
## About the Project

This project is a Laundry Service Website developed using HTML, CSS, and JavaScript. It allows users to select laundry services, add them to a cart, view the total amount, and book the service by filling out a booking form. The website is responsive and works on desktop, tablet, and mobile devices.

## Objectives

- Design a responsive laundry service website.
- Display different laundry services.
- Add and remove services from the cart.
- Calculate the total amount automatically.
- Validate customer details.
- Send booking details using EmailJS.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- EmailJS
- Font Awesome

## Features

- Responsive Navigation Bar
- Hero Section
- Achievement Section
- Laundry Services
- Add Item
- Remove Item
- Dynamic Cart
- Total Amount Calculation
- Booking Form
- Email Validation
- Phone Number Validation
- EmailJS Integration
- Local Storage
- Newsletter Section
- Footer

## Project Structure

Laundry-Service-Website/

│── index.html
│── style.css
│── script.js
│── README.md

└── images/
    │── hero.png
    │── logo.png
    │── washing-machine.png

## How to Run

1. Download the project.
2. Open the project folder.
3. Open `index.html` in any web browser.
4. Select laundry services.
5. Add services to the cart.
6. Fill the booking form.
7. Click **Book Now**.

## EmailJS Configuration

To enable email functionality:

1. Create an account on **EmailJS**.
2. Create a new Email Service.
3. Create a new Email Template.
4. Copy your:
   - Public Key
   - Service ID
   - Template ID
5. Open `script.js`.
6. Replace:

```javascript
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
```

with your actual Public Key.

Replace:

```javascript
"YOUR_EMAILJS_SERVICE_ID"
```

with your Service ID.

Replace:

```javascript
"YOUR_EMAILJS_TEMPLATE_ID"
```

with your Template ID.

7. Save the file.
8. Run the project again and test the booking form.

## Newsletter

The newsletter section allows users to enter their email address. When the **Subscribe** button is clicked, the email is validated and a confirmation message is displayed.

## Validations

The project includes the following validations:

- Name cannot be empty.
- Email must be in valid format.
- Phone number must contain exactly 10 digits.
- At least one laundry service must be added before booking.

## Learning Outcomes

From this project, I learned:

- HTML page structure
- CSS styling
- Responsive web design
- JavaScript basics
- Arrays and loops
- DOM manipulation
- Form validation
- Local Storage
- EmailJS integration

## Future Improvements

- User Login
- Online Payment
- Booking History
- Order Tracking
- Admin Dashboard
- Customer Reviews


This project helped me understand how HTML, CSS, and JavaScript work together to create a responsive website. I also learned how to validate forms, use Local Storage to save cart data, and integrate EmailJS to send booking details through email.
