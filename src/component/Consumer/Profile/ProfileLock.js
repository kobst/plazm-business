import React from 'react';
import styled from "styled-components";
import Frame from '../../../images/Frame.png'

const ProfileLockOuter = styled.div`
    width: 100%;
    text-align: center;    
    box-sizing: border-box;
    padding: 0px 32px;
    margin-top: 133px;
`;

const ProfileLockHeading = styled.div`
    font-weight: bold;
    font-size: 18px;
    color: #FF2E9A;
    margin-bottom:10px;
`;

const ProfileLockContent = styled.div`
    font-weight: 500;
    font-size: 14px;
    color:#FFFFFF;
`;
const ProfileImg = styled.div`
    margin-bottom: 21px;
`;

const ProfileLock = (props) => (    
    <ProfileLockOuter>
        <ProfileImg><img src={Frame} alt={Frame} /></ProfileImg>    
        <ProfileLockHeading>
            Jane Cooper locked Her Profile
        </ProfileLockHeading>
        <ProfileLockContent>
            Only her friends can see what she shares on her timeline.
        </ProfileLockContent>
    </ProfileLockOuter>    
)

export default ProfileLock;