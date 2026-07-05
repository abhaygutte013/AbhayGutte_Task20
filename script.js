
const emailJSConfig = {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

emailjs.init(emailJSConfig.publicKey);

let customUserCartItemsList = [];
let evaluatedInvoiceSumAmount = 0;

window.onload = function () {
    const historicalLocalStorageData = localStorage.getItem("savedLaundryCartItems");
    
    if (historicalLocalStorageData !== null) {
        customUserCartItemsList = JSON.parse(historicalLocalStorageData);
        rebuildCartInterfaceTable();
    }
};

function pushNewItemToCart(chosenServiceName, designatedUnitCost) {
    const serviceRecordBlock = [chosenServiceName, designatedUnitCost];
    
    customUserCartItemsList.push(serviceRecordBlock);
    commitCartStateToDiskCache();
    rebuildCartInterfaceTable();
}

function rebuildCartInterfaceTable() {
    const tableTargetBodyElement = document.getElementById("cartTable");
    const numericalPriceSummaryNode = document.getElementById("total");
    
    tableTargetBodyElement.innerHTML = "";
    evaluatedInvoiceSumAmount = 0;

    for (let currentOffset = 0; currentOffset < customUserCartItemsList.length; currentOffset++) {
        const structuralItemName = customUserCartItemsList[currentOffset][0];
        const financialItemPrice = customUserCartItemsList[currentOffset][1];

        evaluatedInvoiceSumAmount = evaluatedInvoiceSumAmount + financialItemPrice;

        tableTargetBodyElement.innerHTML += 
            "<tr>" +
                "<td>" + (currentOffset + 1) + "</td>" +
                "<td>" + structuralItemName + "</td>" +
                "<td>₹" + financialItemPrice + "</td>" +
                "<td>" +
                    "<button class='remove-btn' onclick='evictItemFromCartOffsetIndex(" + currentOffset + ")'>" +
                        "Remove" +
                    "</button>" +
                "</td>" +
            "</tr>";
    }

    numericalPriceSummaryNode.innerHTML = evaluatedInvoiceSumAmount;
}

function evictItemFromCartOffsetIndex(targetArrayPlacingOffset) {
    customUserCartItemsList.splice(targetArrayPlacingOffset, 1);
    commitCartStateToDiskCache();
    rebuildCartInterfaceTable();
}

function commitCartStateToDiskCache() {
    localStorage.setItem("savedLaundryCartItems", JSON.stringify(customUserCartItemsList));
}

function clearCompleteCartStateSystem() {
    customUserCartItemsList = [];
    commitCartStateToDiskCache();
    rebuildCartInterfaceTable();
}

document.getElementById("bookingForm").onsubmit = function (formDomSubmitEvent) {
    formDomSubmitEvent.preventDefault();

    const individualClientFullName = document.getElementById("name").value.trim();
    const individualClientEmailAddress = document.getElementById("email").value.trim();
    const individualClientMobilePhone = document.getElementById("phone").value.trim();
    const dynamicInterfaceStatusOutputText = document.getElementById("message");

    dynamicInterfaceStatusOutputText.innerHTML = "";

    // Field Guard Validation 1: Universal String Empty Checks
    if (individualClientFullName === "" || individualClientEmailAddress === "" || individualClientMobilePhone === "") {
        alert("Execution Error: Form process blocked. Please fill out all input text indexes.");
        return;
    }

    // Field Guard Validation 2: Explicit Structural Email Layout Formatting Checks
    const standardEmailAddressRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (standardEmailAddressRegexPattern.test(individualClientEmailAddress) === false) {
        alert("Execution Error: Input data format invalid. Please entry a genuine email reference layout.");
        return;
    }

    // Field Guard Validation 3: Telephone Digit Pattern Bounds Checking (Exactly 10 Numerical Keys)
    const exactTenDigitMobilePhoneRegexPattern = /^[0-9]{10}$/;
    if (exactTenDigitMobilePhoneRegexPattern.test(individualClientMobilePhone) === false) {
        alert("Execution Error: Numerical bounds constraint violated. Mobile indices require exactly 10 characters.");
        return;
    }

    // Field Guard Validation 4: Active Cart Items Scope Verification Check
    if (customUserCartItemsList.length === 0) {
        alert("Execution Error: Order pipeline transmission aborted. Please stack at least 1 menu service package item.");
        return;
    }

    // Reconstruct item array indices directly to build a highly visible plain text string collection array listing.
    let flattenedDisplayServicesString = "";
    for (let currentTrackOffset = 0; currentTrackOffset < customUserCartItemsList.length; currentTrackOffset++) {
        flattenedDisplayServicesString += customUserCartItemsList[currentTrackOffset][0];
        
        // Append visual spacing commas uniformly except for termination flags index points.
        if (currentTrackOffset !== customUserCartItemsList.length - 1) {
            flattenedDisplayServicesString += ", ";
        }
    }

    // Build the dynamic variable payload parameters array mapped explicitly matching EmailJS service setups.
    const operationalEmailTemplateBundlePayload = {
        customer_name: individualClientFullName,
        customer_email: individualClientEmailAddress,
        customer_phone: individualClientMobilePhone,
        services: flattenedDisplayServicesString,
        total_amount: evaluatedInvoiceSumAmount
    };

    // Update ongoing validation user state messages gracefully to balance expectations.
    dynamicInterfaceStatusOutputText.style.color = "orange";
    dynamicInterfaceStatusOutputText.innerHTML = "Syncing with transmission servers, please remain on page...";

    // Fire data arrays across network connections to EmailJS framework platforms.
    emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        operationalEmailTemplateBundlePayload
    )
    .then(function () {
        // UI Response Success Configuration Routines
        dynamicInterfaceStatusOutputText.style.color = "green";
        dynamicInterfaceStatusOutputText.innerHTML = "Booking Successful! A structural confirmation email is en route.";
        alert("Transaction Finalized: Your service invoice has been tracked and submitted successfully!");

        // Completely reset form state attributes back to initial system properties.
        document.getElementById("bookingForm").reset();
        clearCompleteCartStateSystem();
    })
    .catch(function (networkTransmissionExceptionLog) {
        dynamicInterfaceStatusOutputText.style.color = "red";
        dynamicInterfaceStatusOutputText.innerHTML = "Transmission Interception Exception: Endpoint verification handshake failed.";
        alert("Processing Fault Notice: Authorization credentials rejected network communication layers.");
        console.error("System Log Output Trace context:", networkTransmissionExceptionLog);
    });
};


document.getElementById("newsletterSubmitBtn").onclick = function () {
    const inputFieldDomElement = document.getElementById("newsletterInputEmail");
    const parsedTargetEmailValue = inputFieldDomElement.value.trim();
    
    // Strict Structural Email Validation Regex Pattern
    const preciseEmailStructuralValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Field Verification Logic Guards
    if (parsedTargetEmailValue === "") {
        alert("Input Attention: Please supply an active subscriber index tracking email link context first.");
        return;
    }

    if (preciseEmailStructuralValidationRegex.test(parsedTargetEmailValue) === false) {
        alert("Input Attention: System cannot process subscription request. Formatting parsing structure is broken.");
        return;
    }

    // UI Response Alerts Execution Pass
    alert("Subscription Process Completed! Verification tracking loops registered for context pointer: " + parsedTargetEmailValue);
    inputFieldDomElement.value = "";
};
