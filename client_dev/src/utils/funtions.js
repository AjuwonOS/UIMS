import { COST_OF_SINGLE_KEY } from "./constants.js";

export function changeNumberOfKey(isMinus, numberOfKeysInput) {
  let currentNumberOfKeys = parseInt(numberOfKeysInput.value);
  if (isMinus) {
    currentNumberOfKeys > 1 ? currentNumberOfKeys-- : (currentNumberOfKeys = 1);
    numberOfKeysInput.value = currentNumberOfKeys;
    return;
  }
  currentNumberOfKeys++;
  numberOfKeysInput.value = currentNumberOfKeys;
}

export function changeCostOfAccessKey(costOfKeysText, numberOfKeysInput) {
  const currentNumberOfKeys = parseInt(numberOfKeysInput.value);
  costOfKeysText.textContent = (
    currentNumberOfKeys * COST_OF_SINGLE_KEY
  ).toLocaleString("en-US");
}

export function getCostOfKeys(costOfKeysText) {
  return parseInt(costOfKeysText.textContent.replace(/,/g, ""), 10);
}

export function addError(errorText) {
  const errorItem = document.createElement("p");
  errorItem.textContent = errorText;
  return errorItem;
}

export function getUserData(formData, costOfKeys) {
  return {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    costOfKey: getCostOfKeys(costOfKeys),
  };
}

//console.log(parseInt((costOfKeys.textContent.replace(/,/g, "")), 10))
