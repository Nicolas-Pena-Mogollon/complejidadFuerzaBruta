
/**
 * Calcula y retorna un array de prefijos para el algoritmo KMP.
 * @param {string} substring - Subcadena para la cual se calculará el array de prefijos.
 * @returns {number[]} - Array de prefijos.
 */

function calcularPrefixArray(substring) {
  const prefixArray = [0];
  let len = 0; // Longitud del prefijo actual
  let i = 1; // Índice en el substring

  while (i < substring.length) {
      if (substring[i] === substring[len]) {
          len++;
          prefixArray[i] = len;
          i++;
      } else {
          if (len !== 0) {
              len = prefixArray[len - 1];
          } else {
              prefixArray[i] = 0;
              i++;
          }
      }
  }

  return prefixArray;
}

/**
 * Encuentra todas las ocurrencias de una subcadena en un texto utilizando el algoritmo KMP.
 *
 * @param {string} text - Texto en el que se buscarán las ocurrencias.
 * @param {string} substring - Subcadena que se buscará en el texto.
 * @returns {number[]} - Array de índices de inicio de las ocurrencias.
 */
export function findSubstringKMP(text, substring) {
  const prefixArray = calcularPrefixArray(substring);
  const occurrences = [];
  let i = 0; // Índice en el texto
  let j = 0; // Índice en el substring

  while (i < text.length) {
      if (substring[j] === text[i]) {
          j++;
          i++;
      }

      if (j === substring.length) {
        occurrences.push(i - j);
          j = prefixArray[j - 1];
      } else if (i < text.length && substring[j] !== text[i]) {
          if (j !== 0) {
              j = prefixArray[j - 1];
          } else {
              i++;
          }
      }
  }

  return occurrences;
}

/**
 * Subraya las ocurrencias de una subcadena en un texto con.
 *
 * @param {string} text - Texto original.
 * @param {number[]} occurrences - Array de índices de inicio de las ocurrencias.
 * @param {string} substring - Subcadena que se subrayará en el texto.
 * @returns {string} - Texto con las ocurrencias subrayadas
 */
export function underlineText(text, occurrences, substring) {
  let resultText = "";
  let start = 0;

  for (const i of occurrences) {
    resultText += text.substring(start, i);
    resultText += `<span style="background-color: yellow;">${text.substring(i, i + substring.length)}</span>`;
    start = i + substring.length;
}

  resultText += text.substring(start);
  return resultText;
}
