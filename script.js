document
  .getElementById("incomeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let tax = calculateTax();

    if (tax !== null) {
      showModal(` ${tax.toLocaleString()}`);
    }
  });
document.getElementById("grossIncome").addEventListener("input", () => {
  let value = document.getElementById("grossIncome").value;
  if (validateInput("grossIncome", value)) {
    resetErrorIcons("grossIncome");
  }
});
document.getElementById("extraIncome").addEventListener("input", () => {
  let value = document.getElementById("extraIncome").value;
  if (validateInput("extraIncome", value)) {
    resetErrorIcons("extraIncome");
  }
});
document.getElementById("deductions").addEventListener("input", () => {
  let value = document.getElementById("deductions").value;
  if (validateInput("deductions", value)) {
    resetErrorIcons("deductions");
  }
});
document.getElementById("ageGroup").addEventListener("change", () => {
  let value = document.getElementById("ageGroup").value;
  if (validateAgeGroup(value)) {
    resetErrorIcons("ageGroup");
  }
});
function calculateTax() {
  let grossIncome = document.getElementById("grossIncome").value;
  let extraIncome = document.getElementById("extraIncome").value;
  let deductions = document.getElementById("deductions").value;
  let ageGroup = document.getElementById("ageGroup").value;
  if(deductions=='') deductions=0;
  if(extraIncome=='') extraIncome=0;
  let income = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions);
  let tax = 0;

  if (
    !validateAgeGroup(ageGroup) ||
    !validateInput("grossIncome", grossIncome) ||
    !validateInput("extraIncome", extraIncome) ||
    !validateInput("deductions", deductions)
  ) {
    return null;
  }

  if (income > 800000) {
    let taxRate = getTaxRate(ageGroup);
    tax = taxRate * (income - 800000);
  }

  return tax;
}

function validateInput(fieldId, value) {

  if (isNaN(value) || value < 0) {
    document.getElementById(fieldId + "ErrorIcon").classList.add("visible");
    return false;
  }
  return true;
}

function validateAgeGroup(ageGroup) {
  if (ageGroup === "") {
    document.getElementById("ageErrorIcon").classList.add("visible");
    return false;
  }
  return true;
}

function resetErrorIcons(fieldId) {
  if (fieldId == "ageGroup") {
    document.getElementById("ageErrorIcon").classList.remove("visible");
  } else
    document.getElementById(fieldId + "ErrorIcon").classList.remove("visible");
}

function getTaxRate(ageGroup) {
  switch (ageGroup) {
    case "under40":
      return 0.3;
    case "40to60":
      return 0.4;
    case "60plus":
      return 0.1;
    default:
      return 0;
  }
}

function showModal(message) {
  let modal = document.getElementById("resultModal");
  let resultText = document.getElementById("resultText");
  let span = document.getElementsByClassName("close")[0];

  resultText.textContent = message;
  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
