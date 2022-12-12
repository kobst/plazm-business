/* eslint-disable no-sequences */

import React, {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import SubHeading from '../SubHeading';
import Facebook from '../../../images/facebook.svg';
import Twitter from '../../../images/Twitter.svg';
import Instagram from '../../../images/Instagram.svg';
import linkedIn from '../../../images/linkedIn.svg';
import ModalBox from '../../Edit-Business/index';
import Badges from '../../UI/Badges';
import MapPin from '../../../images/map-pin.svg';
import ButtonSmall from '../../UI/ButtonSmall';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage('en');

const LeftSidebar = styled.div`
  width:100%;
  max-width: 614px;
  background: #F2FBFF;;
  padding: 10px 10px 15px;
  border: 1px solid #DBE2EA;
  box-shadow:  0px 56px 63px rgba(255, 82, 117, 0.19),
   0px 23.3955px 26.3199px rgba(255, 82, 117, 0.136582), 
   0px 12.5083px 14.0719px rgba(255, 82, 117, 0.11326), 
   0px 7.01207px 7.88858px rgba(255, 82, 117, 0.095), 
   0px 3.72406px 4.18956px rgba(255, 82, 117, 0.0767396), 0px 1.54966px 1.74337px rgba(255, 82, 117, 0.0534177);
}
  border-radius:25px;
  position: absolute;
  top: 110px;
  right:0px;
  z-index: 100;
  visibilty:hidden;
  :after,:before{
    bottom: 100%;
    right: 37px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  :after{
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #f1fbff;
    border-width: 7px;
    right: 39px;
  }
  :before{
    border-color: rgba(194,225,245,0);
    border-bottom-color: #dae2e9;
    border-width: 9px;
  }
  @media (max-width:767px){
    width:100%; 
    top:62px;
    :after{
      right:21px;
    }
    :before{
      right:19px;
    }
  }
`;
const Listing = styled.div`
  width: 94%;
  margin: 0 auto;
  padding: 15px 0;
  border-bottom: 1px solid #e5e9eb;
  &:last-child {
    border-bottom: none;
  }

  h2 {
    margin: 0px;
    color: #2c2738 !important;
    font-size: 17px !important;
    @media (max-width: 767px) {
      margin-left: 0px !important;
    }
  }
  p {
    font-size: 12px;
    line-height: 18px;
    color: #2c2738;
    margin-bottom: 0px;
    margin-top: 5px;
    display: flex;
    width: 100%;
    word-break: break-word;
    span:last-child {
      margin-left: auto;
      width: auto;
    }
  }
`;

const SocialIcon = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  img {
    margin-right: 10px;
  }
`;
const Map = styled.div`
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #dadada;
  img {
    max-width: 100%;
  }
`;
const CompanyAddress = styled.div`
  width: 94%;
  margin: 30px auto 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 20px;
    line-height: 28px;
    color: #ff479d;
    font-weight: normal;
  }
  p {
    font-size: 12px;
    line-height: 18px;
    color: #2c2738;
  }
`;
const SocialOuter = styled.div`
  width: 94%;
  margin: 40px auto 10px;
  @media (max-width: 767px) {
    margin: 15px auto 0;
  }
`;

const Sidebar = ({value}) => {
  const history = useHistory();
  const [placeValue, setPlace] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();
  const [LinkedIn, setLinkedIn] = useState();
  const [tags, setTags] = useState([]);
  const [changeCenter, setChangeCenter] = useState();
  const [openingHours, setOpeningHours] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const updateUser = async (authState) => {
      try {
        if (typeof value.handles !== 'undefined') {
          setFacebook(value.handles.facebook);
          setInstagram(value.handles.instagram);
          setTwitter(value.handles.twitter);
          setLinkedIn(value.handles.linkedin);
          setOpeningHours(value.hours_format);
        }
        setLatitude(value.latitude);
        setLongitude(value.longitude);
        setTags(value.filter_tags);
        setPlace(value);
        findAddress(value.address);
      } catch (err) {}
    };
    updateUser();
  }, [value]);
  const center = {
    lat: 30.7092231,
    lng: 76.68880390000004,
  };
  const zoom = 15;
  const AnyReactComponent = ({text}) => (
    <div
      style={{
        color: 'white',
        padding: '10px 5px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="mapTextOuter">
        <img src={MapPin} alt="" /> <div className="mapText">{text}</div>
      </div>
    </div>
  );
  const mapOptions = {
    disableDefaultUI: true,
    scrollwheel: false,
  };
  const findAddress = (userAddress) => {
    Geocode.fromAddress(userAddress).then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location;
          setChangeCenter({lat, lng});
        },
        (error) => {
          console.error(error);
        },
    );
  };

  return (
    <LeftSidebar>
      {typeof placeValue !== 'undefined' ? (
        <>
          <Map>
            <div style={{height: '100%', width: '100%'}}>
              <GoogleMapReact
                center={
                  typeof changeCenter === 'undefined' ? center : changeCenter
                }
                defaultZoom={zoom}
                options={mapOptions}
              >
                <AnyReactComponent
                  lat={latitude}
                  lng={longitude}
                  text={
                    typeof placeValue !== 'undefined' ?
                      placeValue.company_name :
                      null
                  }
                />
              </GoogleMapReact>
            </div>
          </Map>
          <CompanyAddress>
            <div>
              <h3>
                {typeof placeValue !== 'undefined' ?
                  placeValue.company_name :
                  null}
              </h3>
              <p>0 Followers</p>
            </div>
            <ButtonSmall
              onClick={() => history.push(`/edit-profile`)}
              setIsOpen={setIsOpen}
            >
              Edit Profile
            </ButtonSmall>
          </CompanyAddress>
          <Listing>
            <SubHeading name="Address" />
            <p>
              {typeof placeValue !== 'undefined' ? placeValue.address : null}
            </p>
            <ModalBox
              value={placeValue}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              data=""
              closeModal={() => setIsOpen(false)}
            />
          </Listing>
          <Listing>
            <SubHeading name="Website" />
            <p>
              {typeof placeValue !== 'undefined' && placeValue.web_site ?
                placeValue.web_site :
                '-'}
            </p>
          </Listing>
          <Listing>
            <SubHeading name="Type" />
            <p>
              {typeof placeValue !== 'undefined' && placeValue.type ?
                placeValue.type :
                '-'}
            </p>
          </Listing>
          <Listing>
            <SubHeading name="Status" />
            <p>
              {typeof placeValue !== 'undefined' && placeValue.status ?
                placeValue.status :
                '-'}
            </p>
          </Listing>
          <Listing>
            <SubHeading name="Phone" />
            <p>
              {typeof placeValue !== 'undefined' && placeValue.telephone ?
                placeValue.telephone :
                '-'}
            </p>
          </Listing>
          <Listing>
            <SubHeading name="Opening Hours" />
            {typeof placeValue !== 'undefined' && openingHours ?
              openingHours.map((v, key) => (
                <p key={key}>
                  <span>
                    {v.StartDay} - {v.EndDay}
                  </span>{' '}
                  <span style={{marginLeft: 'auto'}}>
                    {v.Start} to {v.End}
                  </span>
                </p>
              )) :
              null}
          </Listing>

          <Listing style={{borderBottom: 'none'}}>
            <SubHeading name="Hashtags" />
            {typeof placeValue !== 'undefined' ?
              // eslint-disable-next-line react/jsx-key
              tags.map((v) => <Badges name={v} />) :
              null}
          </Listing>

          <SocialOuter>
            <SocialIcon>
              <div>
                {typeof placeValue !== 'undefined' && facebook ? (
                  <a href={facebook}>
                    <img src={Facebook} alt={Facebook} />
                  </a>
                ) : null}
                {typeof placeValue !== 'undefined' && twitter ? (
                  <a href={twitter}>
                    <img src={Twitter} alt={Twitter} />
                  </a>
                ) : null}
                {typeof placeValue !== 'undefined' && LinkedIn ? (
                  <a href={LinkedIn}>
                    <img src={linkedIn} alt={linkedIn} />
                  </a>
                ) : null}
                {typeof placeValue !== 'undefined' && instagram ? (
                  <a href={instagram}>
                    <img src={Instagram} alt={Instagram} />
                  </a>
                ) : null}
              </div>
              <ButtonSmall
                bgColor="#FF7171"
                maxWidth="139px"
                type="submit"
                onClick={() => Auth.signOut()}
                className="btn btn-primary"
              >
                {' '}
                <Link to="/business/login">Logout</Link>
              </ButtonSmall>
            </SocialIcon>
          </SocialOuter>
        </>
      ) : null}
    </LeftSidebar>
  );
};

export default Sidebar;
