console.log("hello ts");
// Import the list of countries
import { countryList } from "./code.js";
const baseURL = "https://api.frankfurter.app/latest";
const defaultFromCurrency = "USD";
const defaultToCurrency = "EUR";
// Selecting the required HTML elements and specifying their types
let dropdowns = document.querySelectorAll("#dropdown select");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let btn = document.querySelector("#btn");
// Fetch the list of currencies from the API
fetch(`${baseURL}`)
    .then((resp) => {
    if (!resp.ok) {
        throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }
    return resp.json();
})
    .then((data) => {
    console.log(data);
    // Populate dropdown menus with country currency codes
    dropdowns.forEach((select) => {
        for (let code in countryList) {
            let newOptions = document.createElement("option");
            newOptions.innerText = code;
            newOptions.value = code;
            // Default selections for "from" and "to" currencies
            if (select.name === "from" && code === defaultFromCurrency) {
                newOptions.selected = true;
            }
            else if (select.name === "to" && code === defaultToCurrency) {
                newOptions.selected = true;
            }
            select.append(newOptions);
        }
        // Add event listener to update the flag whenever the currency is changed
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    });
})
    .catch((err) => {
    console.error("Error fetching currencies:", err);
    msg.innerText = "Error fetching currencies. Please try again later.";
});
// Function to update the flag based on the selected currency
const updateFlag = (element) => {
    let currcode = element.value; // Get the selected currency code
    let countryCode = countryList[currcode]; // Get the corresponding country code
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Construct the URL for the flag image
    let img = element.parentElement?.querySelector("img");
    if (img) {
        img.src = newsrc; // Update the source of the image to the new flag
    }
    else {
        console.warn(`No flag image element found for ${currcode}`);
    }
};
// Function to update the exchange rate and display it
const updateExchangeRate = async () => {
    let amount = document.querySelector("#amount input");
    let amountVal = parseFloat(amount.value) || 1; // Set a default value of 1 if invalid
    amount.value = amountVal.toString(); // Ensure the input reflects the valid number
    try {
        console.log(`From currency: ${fromcurr.value}`);
        console.log(`To currency: ${tocurr.value}`);
        const URL = `${baseURL}?amount=${amountVal}&from=${fromcurr.value}&to=${tocurr.value}`; // Use .value to get the selected currency codes
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        const rate = data.rates[tocurr.value];
        if (rate) {
            const finalAmount = amountVal * rate; // Calculate the converted amount
            msg.innerText = `${amountVal} ${fromcurr.value} = ${finalAmount.toFixed(2)}  ${tocurr.value}`; // Display the result
        }
        else {
            msg.innerText = `Unable to find exchange rate for ${tocurr.value}.`;
        }
    }
    catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Error fetching exchange rate. Please try again later.";
    }
};
// Add click event listener to the button to trigger the exchange rate update
btn?.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
// Trigger the exchange rate update when the page loads
window.addEventListener("load", () => {
    updateExchangeRate();
});
