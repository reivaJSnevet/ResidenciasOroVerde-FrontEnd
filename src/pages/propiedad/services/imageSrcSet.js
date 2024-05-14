/**
 * Generates the src and srcSet attributes for an image with specified size, rows, and columns.
 *
 * @param {string} image - The URL of the image.
 * @param {number} size - The size of the image (width or height).
 * @param {number} [rows=1] - The number of rows in the image grid.
 * @param {number} [cols=1] - The number of columns in the image grid.
 * @returns {Object} - An object containing the src and srcSet attributes.
 */
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default srcset;
