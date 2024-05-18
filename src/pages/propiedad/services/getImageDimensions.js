/**
 * Retrieves the dimensions (width and height) of an image from the given URL.
 *
 * @param {string} url - The URL of the image.
 * @returns {Promise<{ width: number, height: number }>} A promise that resolves with an object containing the width and height of the image.
 */
const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = url;
  });
};

export default getImageDimensions;
