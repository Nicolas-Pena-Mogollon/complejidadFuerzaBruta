import { validateField, validateFile } from "./validators/validation.js";

const fileInput = document.querySelector("#file__input");
const input = document.querySelector("#input__search");
const contentDiv = document.querySelector('#display__textarea');

input.addEventListener("blur", (input) => { validateField(input.target); });

fileInput.addEventListener('change', function (e) {
    if(validateFile(fileInput)){
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const contenido = event.target.result;
            contentDiv.textContent = contenido;
        };
        reader.readAsText(file);
    }
});