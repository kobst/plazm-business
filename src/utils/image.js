/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */

 export const createImage = (url) =>
 new Promise((resolve, reject) => {
   const image = new Image()
   image.addEventListener('load', () => resolve(image))
   image.addEventListener('error', (error) => reject(error))
   image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
   image.src = url
 })

 export const getCroppedImg = async (imageSrc, pixelCrop, fileName, type) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
 
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
 
  // As Base64 string
  const base64Image = canvas.toDataURL(type);
 
  // As a blob
  return new Promise((resolve, reject) => {
    resolve(base64Image);
    // canvas.toBlob(file => {
    //   file.name = fileName;
    //   resolve(file);
    // }, 'image/jpeg');
  });
}

export async function dataUrlToFile(dataUrl, fileName) {

  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/jpeg' });
}
