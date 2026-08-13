import { PAYMENTURL } from "./utils/constants.js";
import { userSchema } from "./utils/formValidation.js";
import {
  addError,
  changeCostOfAccessKey,
  changeNumberOfKey,
  getCostOfKeys,
  getUserData,
} from "./utils/funtions.js";

/* HTML elements */
//UIMS Access Key elements
const numberOfKeysInput = document.getElementById("keys");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const costOfKeys = document.querySelector(".cost_of_keys_text");

//Form elements
const form = document.querySelector("#form");
const payButton = document.querySelector("#pay_button");

//Error message element
const errorMessages = document.querySelector(".error_message");

/* Event Handlers */
//Increase number of UIMS Access Keys
minusButton.addEventListener("click", () => {
  changeNumberOfKey(true, numberOfKeysInput);
  changeCostOfAccessKey(costOfKeys, numberOfKeysInput);
});

plusButton.addEventListener("click", () => {
  changeNumberOfKey(false, numberOfKeysInput);
  changeCostOfAccessKey(costOfKeys, numberOfKeysInput);
});

window.addEventListener("pageshow", () => {
  changeCostOfAccessKey(costOfKeys, numberOfKeysInput)
})

numberOfKeysInput.addEventListener("input", () => {
  changeCostOfAccessKey(costOfKeys, numberOfKeysInput)
})
//Payment event
payButton.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    errorMessages.replaceChildren();
    payButton.textContent = "Processing..."

    const formData = new FormData(form, payButton);
    const userData = getUserData(formData, costOfKeys, numberOfKeysInput);
  
    const { success, data, error } = userSchema.safeParse(userData);

    if (!success) {
      if (errorMessages.childNodes.length == 4) {
        return;
      }
      const arrayOfErrors = JSON.parse(error.message);
      for (let error of arrayOfErrors) {
        errorMessages.appendChild(addError(error.message));
      }
      payButton.textContent = "Pay"; //
      return;
    }

    const response = await fetch(`${PAYMENTURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      errorMessages.textContent = "Connection Error";
      payButton.textContent = "Pay"; //
      return
    }

    const responseData = await response.json();

    if (!responseData.success) {
      errorMessages.textContent = responseData.message
      payButton.textContent = "Pay"; //
      return
    }
    
    document.location.href = (responseData.url); // replace with document.location.replace(responseData.url) in production
    
    setTimeout(() => {
      payButton.textContent = "Pay"
      form.reset();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});

//Increase cost of keys
