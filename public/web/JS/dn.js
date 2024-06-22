function validateSurveyForm() {
  try {
    // Reset error elements
    resetErrorElements();

    const errors = [];
    const validateNameInput = validateInput("surveyForm", "name", [
      { type: "email_or_sdt" },
      { type: "required" },
    ]);

    if (validateNameInput) {
      errors.push(validateNameInput);
    }
    const validatePassInput = validateInput("surveyForm", "pass", [
      { type: "minLength", value: 10 },
      { type: "required" },
    ]);

    if (validatePassInput) {
      errors.push(validatePassInput);
    }

    if (errors.length === 0) {
      return true;
    }

    for (const error of errors) {
      document.getElementById("error_" + error.name).innerHTML = error.message;
    }
    document.forms["surveyForm"][errors[0].name].focus();
    return false;
  } catch (e) {
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
            message: input + " không được để trống",
          };
          inputElement.style.border = "1px solid red";
        }
        break;
      case "minLength":
        if (inputElement.value.length < validation.value) {
          error = {
            name: input,
            message:
              input + " không được ít hơn " + validation.value + " ký tự",
          };
        } else {
          inputElement.style.border = "1px solid green";
        }
        break;
      //   case "email":
      //     if (
      //       inputElement.value.trim() &&
      //       !inputElement.value.match(
      //         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //       )
      //     ) {
      //       error = {
      //         name: input,
      //         message: "Email không đúng định dạng",
      //       };
      //     }
      //     break;
      //   case "sdt":
      //     if (
      //       inputElement.value.trim() &&
      //       !inputElement.value.match(/^(\d{10,11})$/)
      //     ) {
      //       error = {
      //         name: input,
      //         message: "Số điện thoại không đúng định dạng",
      //       };
      //     }
      //     break;
      case "email_or_sdt":
        if (
          !inputElement.value.trim() ||
          (!inputElement.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) &&
            !inputElement.value.match(/^(\d{10,11})$/))
        ) {
          error = {
            name: input,
            message: "Email hoặc Số điện thoại không đúng định dạng !!!",
          };
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
  const errorElements = document.querySelectorAll("[id^='error_']");
  for (const errorElement of errorElements) {
    errorElement.innerHTML = "";
  }
}
