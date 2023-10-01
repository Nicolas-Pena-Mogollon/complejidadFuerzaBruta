
// Importa las funciones de validación y procesamiento de las clases validator y process.
import { validateField, validateFile, validateDivContent } from "../validators/validator.js";
import { findSubstringKMP, underlineText } from "../kmp/process.js";

//Obtiene los datos de los elementos del html
const fileInput = document.querySelector("#file__input");
const inputSearch = document.querySelector("#text_value");
const contentDiv = document.querySelector('#display__textarea');
const spanDefaultError = document.querySelector("#span_general__error");
const contentDivCount = document.querySelector('#count_words');
const buttonSearch = document.querySelector('#search__button');
const checkInput = document.querySelector('#check__input');
var originalText = "";

// Agrega un evento para validar el campo de búsqueda cuando pierde el foco.
inputSearch.addEventListener("blur", (input) => { validateField(input.target); });

// Agrega un evento para el cambio de archivos en el campo de entrada de archivos.
fileInput.addEventListener('change', function (e) {
    // Valida el archivo seleccionado. y obtiene el contenido
    if (validateFile(fileInput)) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            // Almacena el texto original y lo muestra en el área de contenido.
            const contenido = event.target.result;
            originalText = contenido;
            contentDiv.textContent = contenido;
        };
        reader.readAsText(file);
    }
});

//Agrega evento para el botón de búsqueda
buttonSearch.addEventListener('click', function (e) {
    e.preventDefault();
    // Valida el campo de búsqueda y el div de contenido.
    if (validateField(inputSearch) && validateDivContent(contentDiv, spanDefaultError)) {
        contentDiv.textContent = originalText;
        let content = contentDiv.textContent;
        let valueToFind = inputSearch.value;
        //En caso de tener la sensiblidad a mayusculas y minusculas.
        if (!checkInput.checked) {
            content = content.toUpperCase();
            valueToFind = valueToFind.toUpperCase();
        }

        //Encuentra las ocurrencia del texto usando el algoritmo KMP
        const occurrences = findSubstringKMP(content, valueToFind);
        //Subraya el txto original con la información obtenida
        const newText = underlineText(originalText, occurrences, valueToFind);
        //Muestra el texto subrayado
        contentDiv.innerHTML = newText;
        contentDivCount.innerHTML = occurrences.length;
    }
});
