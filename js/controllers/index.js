import { validateField, validateFile, validateDivContent } from "../validators/validator.js";
import { findSubstringKMP, underlineText } from "../kmp/process.js";

const fileInput = document.querySelector("#file__input");
const inputSearch = document.querySelector("#input__search");
const contentDiv = document.querySelector('#display__textarea');
const spanDefaultError = document.querySelector("#span_general__error");
const contentDivCount = document.querySelector('#count_words');
const buttonSearch = document.querySelector('#search__button');
const checkInput = document.querySelector('#check__input');
var originalText = "";

inputSearch.addEventListener("blur", (input) => { validateField(input.target); });

fileInput.addEventListener('change', function (e) {
    if (validateFile(fileInput)) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const contenido = event.target.result;
            originalText = contenido;
            contentDiv.textContent = contenido;
        };
        reader.readAsText(file);
    }
});

buttonSearch.addEventListener('click', function (e) {
    e.preventDefault();
    if (validateField(inputSearch) && validateDivContent(contentDiv, spanDefaultError)) {
        contentDiv.textContent = originalText;
        let content = contentDiv.textContent;
        let valueToFind = inputSearch.value;
        //En caso de tener la sensiblidad a mayusculas y minusculas.
        if (!checkInput.checked) {
            content = content.toUpperCase();
            valueToFind = valueToFind.toUpperCase();
        }
        const occurrences = findSubstringKMP(content, valueToFind);
        const newText = underlineText(originalText, occurrences, valueToFind);
        contentDiv.innerHTML = newText;
        contentDivCount.innerHTML = occurrences.length;
    }
});
