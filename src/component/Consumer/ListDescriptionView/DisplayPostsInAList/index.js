import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ProfileImg from '../../../../images/profile-img.png';
import UserMessage from '../../HomeSearch/BusinessListing/UserMessage';
import {useHistory} from 'react-router';
import {
  checkMime,
  replaceBucket,
} from '../../../../utilities/checkResizedImage';

import useStore from "../../useState";
import {InnerListBanner, RightBuisinessName, BuisinessName} from "../../FeedContent/styled";

const UserMessageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0;
  flex-direction: column;
  @media (max-width: 767px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.UserReplyContent {
    padding: 10px 0 0 40px;
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;
const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 12px 0 12px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: calc(100% - 20px);
    background: #878787;
    top: 50px;
    left: 26px;
    z-index: 1;
    display: none;
  }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0 0 5px 0;
  margin: 0;
  width: 100%;
  margin-left: auto; 
  margin-right: 0;
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #fff;
  margin-top: 5px;
  svg {
    color: #ff0000;
    margin: 0;
  }
  div {
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  div {
    cursor: pointer;
  }
  .ListName {
    max-width: calc(100% - 95px);
    @media (max-width: 767px) {
      max-width: 100%;
      margin: 0 0 5px;
    }
  }
`;

const DescriptionViewItem = styled.div`
  .background-active {
    background-color: #221e45;
  }
  .background-inactive {
    background-color: #282352;
  }
`;

const TitleBarWrap = styled.div`
  display: flex;
  width: 100%;
  margin-left: auto; 
  margin-right: 0;
`;

/** display business details */
const DisplayPostInAList = ({data, id}) => {
  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setListIndex = useStore((state) => state.setListIndex);

  const [image, setImage] = useState(
    data.business[0].default_image_url ?
      data.business[0].default_image_url :
      ProfileImg,
  );

  useEffect(() => {
    if (data.business[0].default_image_url) {
      const findMime = checkMime(data.business[0].default_image_url);
      const image = replaceBucket(
          data.business[0].default_image_url,
          findMime,
          30,
          30,
      );
      setImage(image);
    } else {
      setImage(ProfileImg);
    }
  }, [data]);

  const checkError = () => {
    if (data.business[0].default_image_url) {
      setImage(data.business[0].default_image_url);
    } else {
      setImage(ProfileImg);
    }
  };

  const history = useHistory();

  /** to display business details page */
  const displayBusinessDetail = () => {
    setListIndex(data.business[0]._id);
    history.push(`/b/${data.business[0]._id}`);
  };

  return data ? (
    <>
      <DescriptionViewItem>
        <div
          className={id % 2 === 0 ? 'background-active' : 'background-inactive'}
        >
          {/* <UserMsgWrap>
            <UserMessageContent>
              <ProfileNameHeader>
                <TitleBarWrap> */}
                  {/* <InnerListBanner>
                    <img src={image} onError={() => checkError()} alt="" />
                    <ProfileThumbOverlay /> 
                  </InnerListBanner>
                  <ProfileName>
                    <div onClick={() => displayBusinessDetail()}>
                      {data.business[0].company_name}
                    </div>
                  </ProfileName>  */}
                  {/* <RightBuisinessName>
                          <BuisinessName onClick={() => displayBusinessDetail()}>{data.business[0].company_name}</BuisinessName>
                        <div className="hex">
                          <div className="hex-background">
                          <img src={image} onError={() => checkError()} alt="" />
                          </div>
                        </div>
                  </RightBuisinessName>
                </TitleBarWrap>
              </ProfileNameHeader>
            </UserMessageContent>
          </UserMsgWrap> */}

          <UserMessage
            postData={data}
            businessData={data.business[0]}
            listView={true}
            setSelectedListId={setSelectedListId}
            listDescriptionView={true}
            setListIndex={setListIndex}
          />
        </div>
      </DescriptionViewItem>
    </>
  ) : null;
};

export default DisplayPostInAList;
