
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
        // Si el carácter actual del substring es igual al carácter correspondiente en el prefijo,
        // se incrementa la longitud del prefijo y se avanza en el substring.
      if (substring[i] === substring[len]) {
          len++;
          prefixArray[i] = len;
          i++;
      } else {
        // Si no hay coincidencia y la longitud del prefijo no es cero,
        // se actualiza la longitud del prefijo usando el valor en el índice anterior del array de prefijos.
          if (len !== 0) {
              len = prefixArray[len - 1];
          } else {
            // Si la longitud del prefijo es cero, se establece el valor en el array de prefijos y se avanza en el substring.
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
    // Si los caracteres correspondientes en el substring y el texto son iguales,
    // se incrementan ambos índices.
      if (substring[j] === text[i]) {
          j++;
          i++;
      }
      // Si se encuentra una ocurrencia completa de la subcadena,
      // se agrega el índice de inicio al array de ocurrencias y se actualiza el índice en el substring.
      if (j === substring.length) {
        occurrences.push(i - j);
          j = prefixArray[j - 1];
      } else if (i < text.length && substring[j] !== text[i]) {
        // Si no hay coincidencia y no se ha alcanzado el final del texto,
        // se ajustan los índices según el array de prefijos.
          if (j !== 0) {
              j = prefixArray[j - 1];
          } else {
            // Si la longitud del prefijo es cero, se avanza en el texto.
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
    // Se agrega la parte del texto entre las ocurrencias al resultado.
    resultText += text.substring(start, i);
    // Se agrega la ocurrencia subrayada al resultado.
    resultText += `<span style="background-color: yellow;">${text.substring(i, i + substring.length)}</span>`;
    start = i + substring.length;
}
  // Se agrega la parte restante del texto al resultado.
  resultText += text.substring(start);
  return resultText;
}
