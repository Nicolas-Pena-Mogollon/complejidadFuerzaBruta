/**
 * Valida un campo de entrada, marcando como inválido si está vacío.
 *
 * @param {HTMLInputElement} input - El elemento de entrada a validar.
 * @returns {boolean} - Devuelve true si el campo es válido, false si es inválido.
 */

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

/**
 * Valida un campo de entrada de archivos, marcando como inválido si no se ha seleccionado un archivo o si el tipo de archivo no es de texto.
 *
 * @param {HTMLInputElement} fileInput - El elemento de entrada de archivos a validar.
 * @returns {boolean} - Devuelve true si el campo es válido, false si es inválido.
 */
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


/**
 * Valida el contenido de un elemento div, marcando como inválido si está vacío.
 *
 * @param {HTMLDivElement} divItem - El elemento div cuyo contenido se va a validar.
 * @param {HTMLSpanElement} spanElement - El elemento span asociado utilizado para mostrar mensajes de error.
 * @returns {boolean} - Devuelve true si el contenido es válido, false si es inválido.
 */
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