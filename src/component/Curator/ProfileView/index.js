import React from "react";
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import ProfileImg from '../../../images/profile-img.png';
import BackButton from "../UI/BackButton";

const ProfileViewContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;
    flex-wrap:wrap;
`


const CloseDiv = styled.div`
    width:24px;
    position: relative;
    display:flex;
    justify-content:flex-end;
    position: absolute;
    right: 17px;
    cursor: pointer;
    top: 17px;
    svg{
        font-size:24px;
        color:#fff;
    }
`

const TopProfileBar = styled.div`
    width: 100%;
    padding: 0 40px;
    margin: 40px 0 0px;
    display:flex;
    flex-direction:row;
    align-items:flex-start;
    font-weight: 600;
    font-size: 13px;
    color:#fff;
    @media (max-width:767px){
        flex-direction:column;
        padding: 0 20px 20px;
        margin: 20px 0 0px;
    }
`

const UserImage = styled.div`
    width: 86px;
    height: 86px;
    padding: 0;
    margin: 0 15px 0 0;
    display:flex;
    align-items:center;
    background: #FAFAFA;
    border: 3px solid #FF2A88;
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1);
    border-radius:50%;
    justify-content:center;
    align-items:center;
    overflow: hidden;
    img{
        max-width:100%;
    }
    @media (max-width:767px){
        width: 60px;
        height: 60px;
        margin: 0 0 15px 0;
    }
`
const UserNameWrap = styled.div`
    font-weight: 500;
    font-size: 12px;
    color: #FFFFFF;
    max-width: calc(100% - 105px);
    width: 100%;
    @media (max-width:767px){
        max-width: 100%;
        line-height: normal;
    }
`

const UserName = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color:#00E0FF;
    margin: 0 0 3px 0;
    line-height: normal;
    @media (max-width:767px){
        font-size: 18px;
    }
`

const UserLocation = styled.div`
    font-weight: 500;
    font-size: 14px;
    color: #FFFFFF;
    margin: 0 0 10px 0;
`
const UserFollowersWrap = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    align-items: flex-end;
    @media (max-width:767px){
        flex-direction:column;
        align-items: flex-start;
    }
`
const UserFollowersList = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    margin: 0 0 2px 0;
`

const Count = styled.div`
    font-weight: 900;
    font-size: 12px;
    color: #FF2E9A;
    min-width: 40px;
`
const CountName = styled.div`
    font-weight: 600;
    font-size: 12px;
    color: #fff;
`

const UserFollowersListing = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    @media (max-width:767px){
        margin: 0 0 10px 0;
    }
`

const ProfileView = ({}) => {
    return (
    <>
        <ProfileViewContent>
            <CloseDiv><IoMdClose /></CloseDiv>
            <TopProfileBar>
                <UserImage>
                    <img src={ProfileImg} alt="" />
                </UserImage>
                <UserNameWrap>
                    <UserName>Tanya Bennett</UserName>
                    <UserLocation>QueensLand, NJ</UserLocation>
                    <UserFollowersWrap>
                        <UserFollowersListing>
                            <UserFollowersList>
                                <Count>265</Count>
                                <CountName>Friends</CountName>
                            </UserFollowersList>
                            <UserFollowersList>
                                <Count>45</Count>
                                <CountName>Posts</CountName>
                            </UserFollowersList>
                            <UserFollowersList>
                                <Count>265</Count>
                                <CountName>Lists created by me</CountName>
                            </UserFollowersList>
                            <UserFollowersList>
                                <Count>5</Count>
                                <CountName>Lists followed by me</CountName>
                            </UserFollowersList>
                        </UserFollowersListing>
                        <BackButton>Edit</BackButton>
                    </UserFollowersWrap>
                </UserNameWrap>
            </TopProfileBar>
            
        </ProfileViewContent>
    </>
    )
}
  
export default ProfileView