import React, { useEffect, useState } from 'react';
import ProfileImg from '../../../../../images/profile-img.png';
import {
  checkMime,
  replaceBucket,
} from '../../../../../utilities/checkResizedImage';

function ReplyImage({ j }) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (j.userId.photo) {
      const findMime = checkMime(j.userId.photo);
      const image = replaceBucket(j.userId.photo, findMime, 30, 30);
      setImage(image);
    } else {
      setImage(ProfileImg);
    }
  }, [j]);

  const checkError = () => {
    if (j.userId.photo) {
      setImage(j.userId.photo);
    } else setImage(ProfileImg);
  };
  return <img src={image} onError={() => checkError()} alt="" />;
}

export default ReplyImage;
