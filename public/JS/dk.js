function validateSurveyFormDk() {
  try {
    resetErrorElements();
    const errors = [];
    const validatePhoneInput = validateInput("surveyForm", "Phone", [
      {
        type: "required",
      },
      {
        type: "sdt",
      },
    ]);
    if (validatePhoneInput) {
      errors.push(validatePhoneInput);
    }
    if (errors.length == 0) {
      return true;
    }
    for (const error of errors) {
      document.getElementById("error_" + error.name).innerHTML = error.message;
    }
    document.forms["surveyForm"]["Phone"].focus();
    return false;
  } catch (error) {
    return false;
  }
}

function validateInput(form, input, validations) {
  const formElement = document.forms[form];
  const inputElement = formElement[input];
  let error = null;
  for (const validation of validations) {
    switch (validation.type) {
      case "required":
        if (!inputElement.value.trim()) {
          error = {
            name: input,
            message: "Số điện thoại không được để trống",
          };
          inputElement.style.border = "1px solid red";
        } else {
          inputElement.style.border = "1px solid green";
        }
        break;
      case "sdt":
        if (
          inputElement.value.trim() &&
          !inputElement.value.match(/^(\d{10,11})$/)
        ) {
          error = {
            name: input,
            message: "Số điện thoại không đúng định dạng",
          };
          inputElement.style.border = "1px solid red";
        } else {
          inputElement.style.border = "1px solid green";
        }
        break;
    }
  }
  return error;
}

function resetErrorElements() {
  // Reset error messages
  const errorElement = document.querySelector("[id^='error_']");
  errorElement.innerHTML = "";
}
