const bucket = process.env.REACT_APP_BUCKET;
const resizedBucket = process.env.REACT_APP_RESIZED_BUCKET;
export const checkMime = (image) => image.split('.').pop();

export const replaceBucket = (image, mime, width, height) =>
  image
    .replace(bucket, resizedBucket)
    .replace(`.${mime}`, `_${width}_${height}.${mime}`);
