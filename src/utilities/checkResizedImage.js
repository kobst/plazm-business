const bucket = process.env.REACT_APP_BUCKET;
const resizedBucket = process.env.REACT_APP_RESIZED_BUCKET;
export const checkMime = (image) => {
  return image.split(".").pop();
};

export const replaceBucket = (image, mime, width, height) => {
  return image
    .replace(bucket, resizedBucket)
    .replace(`.${mime}`, `_${width}_${height}.${mime}`);
};
