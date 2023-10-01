export function validateField(input) {
    if (input.validity['valueMissing']) {
        input.parentElement.classList.add("input__container__invalid");
        input.parentElement.querySelector(".input__message__error").innerHTML = "El campo debe ser llenado";
        return false;
    } else {
        input.parentElement.classList.remove("input__container__invalid");
        input.parentElement.querySelector(".input__message__error").innerHTML = "";
        return true;
    }
}

export function validateFile(fileInput) {
    var valid = true;
    if (fileInput.files.length === 0) {
        valid = false;
        fileInput.parentElement.classList.add("input__container__invalid");
        fileInput.parentElement.querySelector(".input__message__error").innerHTML = "Por favor, selecciona un archivo";
    }

    const file = fileInput.files[0];

    if (valid && !file.type.startsWith('text/')) {
        valid = false;
        fileInput.value = '';
        fileInput.parentElement.classList.add("input__container__invalid");
        fileInput.parentElement.querySelector(".input__message__error").innerHTML = "El archivo seleccionado no es un archivo de texto (txt)";
    }

    if (!valid) {
        fileInput.parentElement.classList.remove("input__container__invalid");
        fileInput.parentElement.querySelector(".input__message__error").innerHTML = "";
    }

    return valid;
}

export function validateDivContent(divItem, spanElement) {
    if (divItem.textContent === "") {
        spanElement.parentElement.classList.add("input__container__invalid");
        spanElement.parentElement.querySelector(".input__message__error").innerHTML = "No se ha seleccionado ningun archivo";
        return false;
    } else {
        spanElement.parentElement.classList.remove("input__container__invalid");
        spanElement.parentElement.querySelector(".input__message__error").innerHTML = "";
        return true;
    }
}