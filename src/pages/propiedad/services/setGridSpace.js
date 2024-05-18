import getImageDimensions from "./getImageDimensions";
import srcset from "./imageSrcSet";

/**
 * Sets the grid space for a given array of image URLs.
 *
 * @param {string[]} imageUrls - An array of image URLs.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects representing the grid space for each image.
 * @throws {Error} - If `imageUrls` is not a non-empty array.
 */
async function setGridSpace(imageUrls) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    throw new Error("imageUrls must be a non-empty array");
  }

  const results = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        const { width, height } = await getImageDimensions(url);

        let rows, cols;

        if (width > height) {
          // Horizontal
          rows = 1;
          cols = 2;
        } else {
          if( height >= 2000){
            rows = 4;
            cols = 2;
          }else{
            rows = 2;
            cols = 1;
          }
        }

        //incompleto: estoy trabajando en esto; Chino
        /* if (width === height) {
          // Cuadrada
          rows = 3;
          cols = 3;
        } else if (width > height) {
          // Horizontal
          rows = 1;
          cols = 2;
        } else {
          // Vertical
          rows = 2;
          cols = 1;
        } */

        return { url, ...srcset(url, 200, rows, cols), rows, cols };
      } catch (error) {
        console.error("Error loading image:", url, error);
        return null;
      }
    })
  );

  return results.filter(Boolean);
}

export default setGridSpace;
