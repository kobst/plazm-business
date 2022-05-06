import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RightSide from '../../component/RightSide/RightSide';
import { Auth } from 'aws-amplify';
import history from '../../utils/history';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { callPlace } from '../../Api';
import ValueLoader from '../../utils/loader';
// import ws from "../../utils/socket";

// ws.onopen = () => {
//   console.log("connected");
// };
const DashboardContainer = styled.div`
  display: flex;
  background: linear-gradient(157.1deg, #ff7171 -1.1%, #ff479d 100%);
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 0 30px;
  margin: 35px auto 0;
  @media {
    padding: 0 15px;
    margin: 15px auto 0;
  }
`;

process.env.AWS_SDK_LOAD_CONFIG = true;
const Dashboard = () => {
  const [placeValue, setPlace] = useState();
  const [ws, setWs] = useState();
  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        const value = await Auth.currentAuthenticatedUser();
        if (
          value.attributes['custom:type'] === 'curator' ||
          value.attributes['custom:type'] === 'customer' ||
          value.attributes['custom:type'] === 'consumer'
        ) {
          history.push('/');
          window.location.reload();
        } else {
          const place = await callPlace(value.attributes.sub);
          const ws = new WebSocket(
            `${process.env.REACT_APP_WEBSOCKET}/?userId=${place[0]._id}`
          );
          setWs(ws);
          setPlace(place[0]);
        }
      } catch {
        history.push('/business/login');
        window.location.reload();
      }
    };
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {placeValue ? (
        <DashboardContainer>
          <Container>
            <Header value={placeValue} />
            <RightSide ws={ws} />
            <Footer />
          </Container>
        </DashboardContainer>
      ) : (
        <div style={{ textAlign: 'center', margin: ' 40px auto 0' }}>
          <ValueLoader />
        </div>
      )}
    </>
  );
};

export default Dashboard;
