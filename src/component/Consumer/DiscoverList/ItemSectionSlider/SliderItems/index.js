import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import EventImg from "../../../../../images/eventimg.png";
import LockImage from "../../../../../images/lock.png";
import {ItemsWrapper, CoverImg, ItemsDescription, CollectionPara, Lock, DisplayItemContent, InnerCoverImg, InnerItemsDescription, InnerCollectionPara, AuthorInfo, FollowedBy, FollowedByListUl, InnerDescriptionPara, SubscribeBtn} from '../../styled'


const NewInBuzzItems = () => {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const divRef = useRef();

  /** to set position on hover of text */
  const displayData = () => {
    const { top, right } = divRef.current.getBoundingClientRect();
    setOffsetLeft(right - 300);
    setOffsetTop(top - 30);
  };

  return (
    <>
      <ItemsWrapper ref={divRef}>
        <CoverImg>
          <img src={EventImg} alt="" />
          <Lock>
            <img src={LockImage} alt="" />
          </Lock>
          <ItemsDescription onMouseOver={() => displayData()}>
            <CollectionPara>
              The 38 Essential Restaurants in New York City he 38 Essential
              Restaurants in New York City The 38 Essential Restaurants in New
              York City he 38 Essential Restaurants in New York CityThe 38
              Essential Restaurants in New York City he 38 Essential Restaurants
              in New York City
            </CollectionPara>

            <DisplayItemContent
              className="InnerModal"
              offsetLeft={offsetLeft}
              offsetTop={offsetTop}
            >

              <InnerCoverImg>
                <img src={EventImg} alt="" />
                <InnerItemsDescription>
                  <InnerCollectionPara>
                    The 38 Essential Restaurants in New York City he 38 Essential
                    Restaurants in New York City The 38 Essential Restaurants in New
                    York City he 38 Essential Restaurants in New York CityThe 38
                    Essential Restaurants in New York City he 38 Essential Restaurants
                    in New York City
                  </InnerCollectionPara>
                </InnerItemsDescription>
              </InnerCoverImg>
              <AuthorInfo>
                  by <strong>Edward Han</strong>
                  <br />
                  Last Updated Jan 7, 2020, 9:27am EST
              </AuthorInfo>
              <FollowedBy>
                <h2>Followed by</h2>
                <FollowedByListUl>
                  <li><img src={EventImg} alt="" /></li>
                  <li><img src={EventImg} alt="" /></li>
                  <li><img src={EventImg} alt="" /></li>
                  <li><img src={EventImg} alt="" /></li>
                  <li><img src={EventImg} alt="" /></li>
                  <li><img src={EventImg} alt="" /></li>
                  <li><img src={EventImg} alt="" /></li>
                  <div className="MorePlus">+10 more</div>
                </FollowedByListUl>
              </FollowedBy>
              <InnerDescriptionPara>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla fusce nec, ut pellentesque. Sollicitudin vitae cum eget non est sed tellus. Cras nulla fusce nec, ut pellentesque. Sollicitudin vitae cum... <strong>Read More</strong>
              </InnerDescriptionPara>
              <SubscribeBtn>Subscribe</SubscribeBtn>
            </DisplayItemContent>
          </ItemsDescription>
        </CoverImg>
      </ItemsWrapper>
    </>
  );
};

NewInBuzzItems.propTypes = {
  article: PropTypes.object,
};

export default NewInBuzzItems;
