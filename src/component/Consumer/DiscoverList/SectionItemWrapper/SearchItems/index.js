import React, { useState } from "react";
import PropTypes from "prop-types";
import EventImg from "../../../../../images/eventimg.png";
import LockImage from "../../../../../images/lock.png";
import {
  ItemsWrapper,
  CoverImg,
  ItemsDescription,
  CollectionPara,
  Lock,
} from "../../styled";

const SearchItems = ({
  data,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore,
}) => {
  const [image, setImage] = useState(
    data.media && data.media.length > 0 ? data.media[0].image : EventImg
  );

  console.log(data.name + "search items!!!")

  /** to display list details page */
  const displayListDetails = () => {
    setDiscoverBtn(false);
    setSelectedListId(data._id);
    setReadMore(true);
  };
  return (
    <>
      <ItemsWrapper className="SearchItemsWrapper">
        <CoverImg
          className="SearchCoverImg"
          onClick={() => displayListDetails()}
        >
          <img src={image} onError={() => setImage(EventImg)} alt="" />
          {!data.isPublic && data.isPublic !== null && (
            <Lock>
              <img src={LockImage} alt="" />
            </Lock>
          )}
          <ItemsDescription>
            <CollectionPara>{data.name}</CollectionPara>
          </ItemsDescription>
        </CoverImg>
      </ItemsWrapper>
    </>
  );
};

SearchItems.propTypes = {
  article: PropTypes.object,
};

export default SearchItems;
