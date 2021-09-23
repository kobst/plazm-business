import React from "react";
import { FaCaretRight } from "react-icons/fa";

import ProfileImg from "../../../images/profile-img.png";
import BuisinessHeart from "../../../images/buisiness-heart.png";
import InnerImage from "../../../images/Gridview.png";
import GreenDot from "../../../images/green-dot.png";
import {DescriptionViewItem, UserMessageContent, ProfileThumbBanner, ProfileThumbOverlay, ProfileName, FeedContainer, RightIcons, InnerListBanner, InnerOverlay, ListNameWrap, ListName, ListInfo, ListAuthorName, FeedDescription, FeedBigImage, LikesBtnWrap, RightDiv, BottomBarLikes} from './styled'
// import SaveButton from "../../UI/SaveButton";
import PostReplyContent from "./PostReply";
import BottomBarLikesContent from "./BottomBarLikes";


const FeedDataContent = ({ }) => {

 

  return (
    <>
      <DescriptionViewItem>

            <UserMessageContent>
                
                <ProfileThumbBanner>
                  <img src={ProfileImg}  alt="" />
                  <ProfileThumbOverlay />
                  <ProfileName>
                    <span>Test Buisiness</span>
                    <RightIcons>
                        <img src={BuisinessHeart}  alt="" />
                        <img src={GreenDot}  alt="" />
                    </RightIcons>
                  </ProfileName>
                </ProfileThumbBanner>

                <FeedContainer>

                    <InnerListBanner>
                        <img src={ProfileImg}  alt="" />
                        <InnerOverlay />
                        <ListNameWrap>
                            <ListName>The 38 Essential Restaurants in New York City</ListName>
                            <ListInfo>
                                <FaCaretRight />
                                <ListAuthorName>Edward Han</ListAuthorName>
                                <span>|</span>
                                <ListAuthorName>Added on Apr 15, 2021, 5:40pm EDT</ListAuthorName>
                            </ListInfo>
                        </ListNameWrap>
                        
                    </InnerListBanner>

                    <FeedDescription>
                    A bright, cheery spot on the Upper West Side that’s been around since 2015, Boule & Cherie currently has an outdoor patio set up with ample WiFi access. The coffee comes from Stumptown, and the food goes beyond the typical pastry selection here, with quiches and frittatas for a legitimate working breakfast or lunch. It’s open from 7:30 a.m. to 4 p.m. daily.😎😎😎 <br /><br />
                    NYC mainstay Partners offers a full range of speciality coffee drinks, baked goods, and heftier meal options for breakfast and lunch. At the company’s Long Island City location, a selection of pastries is available all day while the kitchen is open from 9 a.m. to 2:45 p.m., serving breakfast burritos, wraps, and sandwiches. Outdoor seating is available and equipped with Wi-Fi. Partners also has locations in Williamsburg and the West Village.<br /><br />
                    NYC mainstay Partners offers a full range of speciality coffee drinks, baked goods, and heftier meal options for breakfast and lunch. At the company’s Long Island City location, a selection of pastries is available all day while the kitchen is open from 9 a.m. to 2:45 p.m.
                    </FeedDescription>

                    <FeedBigImage>
                        <img src={InnerImage}  alt="" />
                    </FeedBigImage>

                    <BottomBarLikesContent />
                </FeedContainer>

                <PostReplyContent />

            </UserMessageContent>

      </DescriptionViewItem>
    </>
  );
}

export default FeedDataContent;
