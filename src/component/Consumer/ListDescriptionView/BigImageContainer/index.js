import React from "react";
import styled from "styled-components";

const BigImageContainer = styled.div`
  height: 230px;
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  margin: 15px 0;
  img {
    max-height: 230px;
    border-radius: 5px;
    width: 100%;
  }
`;

const BigImage = ({ image }) => {
  return (
    image &&
    image.length > 0 && (
      <BigImageContainer>
        <img src={image[0]} alt="alt" />
      </BigImageContainer>
    )
  );
};

export default BigImage;
