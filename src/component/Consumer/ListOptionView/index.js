import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import Input from "../../UI/Input/Input";
import Select from "../../Consumer/UI/Select";
import selectarrow from "../../../images/sortingselectarrow.png";
import SearchIcon from "../../../images/subscriptionSearchIcon.svg";
import UploadImg from "../../../images/upload-img.jpg";
import FollwersImg from "../../../images/profile-img.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdNotificationsActive, MdMessage } from "react-icons/md";
import { CgLock } from "react-icons/cg";
import CheckboxSquare from "../../Consumer/UI/CheckboxSquare"

const ListOptionSection = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0px;
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const HeadingWrap = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
`;

const TopHeadingWrap = styled.div`
  padding: 30px 30px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px dashed #fff;
  @media (max-width: 767px) {
    padding: 15px 15px 0;
  }
`;

const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const SortingSelect = styled.div`
  max-width: 200px;
  margin: 15px 0;
  select {
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    padding-left: 0;
    background: url(${selectarrow}) no-repeat right 10px center transparent;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const SearchWrap = styled.div`
  padding: 10px 30px 0;
  display: flex;
  @media (max-width: 767px) {
    padding: 10px 15px 0;
  }
  .SearchSubscriptionsInput {
    background: url(${SearchIcon}) no-repeat right 10px center #fff;
    border: 1px solid #E4E4E4;
    height: 38px;
    border-radius: 0;
    font-size: 14px;
    padding-right: 35px;
    ::placeholder {
      color: #c8c8c8
    }
  }
`;

const ListingOptionWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
`;

const ListSection = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px;
  background: #1D193B;
  &.AlternateBgColor {
    background: #24204A;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ListImageWrap = styled.div`
  width: 157px;
  height: 115px;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0px 8px 0;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ListDetailWrap = styled.div`
  width: calc(100% - 165px);
  display: flex;
  flex-direction: column;
  padding: 14px 10px 14px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin:8px;
  }
`;

const ListHeadingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 10px;
`;

const ListHeading = styled.div`
  max-width: 256px;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  text-transform: capitalize;
  color: #CAFFFC;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const DotsDiv = styled.div`
  width: 30px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  svg {
    font-size: 14px;
    color: #fff;
  }
`;

const FollowedSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px;
`;

const FollowedHeading = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 10px;
  color: #FFFFFF;
`;

const FollowedListingWrap= styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const FollowersListing= styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowersList= styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: -6px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const MoreSection = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: #FFFFFF;
  margin: 0 0 0 20px;
`;


const BottomMoreSections= styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 479px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 479px) {
    margin: 0 0 10px;
  }
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: #fff;
  margin: 0 10px 0 0;
  svg {
    font-size: 12px;
    color: #fff;
    margin: 0 0 0 5px;
  }
`;

const LastDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: #fff;
  margin: 0;
`;

const LockDiv = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  svg {
    font-size: 12px;
    color: #FF2E9A;
  }
`;

const SubscribedBtn = styled.button`
  padding: 2px 15px;
  border-radius: 20px;
  background: #B4ADF4;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: #FFFFFF;
  margin: 0 10px;
  cursor: pointer;
  :hover, :focus{
    outline: 0;
  }
`;

const MyListBtn = styled.button`
  padding: 2px 15px;
  border-radius: 20px;
  background: #FDBB30;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: #FFFFFF;
  margin: 0 10px;
  cursor: pointer;
  :hover, :focus{
    outline: 0;
  }
`;

const CustomCheckSquare = styled.div`
`;

/*
 * @desc: to display all business lists
 */
const ListOptionView = ({ setDisplayTab }) => {
  return (
    <>
      <ListOptionSection>
        <HeadingWrap>
          <TopHeadingWrap>
            <CloseDiv>
              <IoMdClose onClick={() => setDisplayTab(false)} />
            </CloseDiv>

            <SortingSelect>
              <Select>
                <option>All</option>
              </Select>
            </SortingSelect>
          </TopHeadingWrap>
          <SearchWrap>
            <Input className="SearchSubscriptionsInput" placeholder="Search Subscriptions" />
          </SearchWrap>
        </HeadingWrap>

        <ListingOptionWrap>
          <ListSection>
            <ListImageWrap>
              <img src={UploadImg} alt="" />
            </ListImageWrap>
            <ListDetailWrap>
              
              <ListHeadingWrap>
                <ListHeading>The 38 Essential Restaurants in New York City</ListHeading>
                <DotsDiv>
                  <BsThreeDotsVertical />
                </DotsDiv>
              </ListHeadingWrap>
              
              <FollowedSection>
                <FollowedHeading>Followed by</FollowedHeading>
                <FollowedListingWrap>
                  <FollowersListing>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                  </FollowersListing>
                  <MoreSection>+10 more</MoreSection>
                </FollowedListingWrap>
              </FollowedSection>
              
              <BottomMoreSections>
                
                <LeftDiv>
                  <FirstDiv>
                    <span>5</span>
                    <MdNotificationsActive />
                  </FirstDiv>
                  <FirstDiv>
                    <span>5</span>
                    <MdMessage />
                  </FirstDiv>
                </LeftDiv>
                
                <LastDiv>
                  
                  <LockDiv>
                    <CgLock />
                  </LockDiv>
                  
                  <SubscribedBtn>Subscribed</SubscribedBtn>

                  <CustomCheckSquare>
                      <CheckboxSquare />
                  </CustomCheckSquare>

                </LastDiv>
              
              </BottomMoreSections>
            </ListDetailWrap>
          </ListSection>

          {/* 2nd List */}
          <ListSection className="AlternateBgColor">
            <ListImageWrap>
              <img src={UploadImg} alt="" />
            </ListImageWrap>
            <ListDetailWrap>
              
              <ListHeadingWrap>
                <ListHeading>The 38 Essential Restaurants in New York City</ListHeading>
                <DotsDiv>
                  <BsThreeDotsVertical />
                </DotsDiv>
              </ListHeadingWrap>
              
              <FollowedSection>
                <FollowedHeading>Followed by</FollowedHeading>
                <FollowedListingWrap>
                  <FollowersListing>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                    <FollowersList><img src={FollwersImg} alt="" /></FollowersList>
                  </FollowersListing>
                  <MoreSection>+10 more</MoreSection>
                </FollowedListingWrap>
              </FollowedSection>
              
              <BottomMoreSections>
                
                <LeftDiv>
                  <FirstDiv>
                    <span>5</span>
                    <MdNotificationsActive />
                  </FirstDiv>
                  <FirstDiv>
                    <span>5</span>
                    <MdMessage />
                  </FirstDiv>
                </LeftDiv>
                
                <LastDiv>
                  
                  <LockDiv>
                    <CgLock />
                  </LockDiv>
                  
                  <MyListBtn>My Lists</MyListBtn>

                  <CustomCheckSquare>
                      <CheckboxSquare />
                  </CustomCheckSquare>

                </LastDiv>
              
              </BottomMoreSections>
            </ListDetailWrap>
          </ListSection>

        </ListingOptionWrap>
      </ListOptionSection>
    </>
  );
};

export default ListOptionView;
