import React from 'react';
import styled from 'styled-components';
import Logo from '../../images/logo.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px;
  position: relative;
  p {
    font-size: 11px;
    line-height: 13px;
    color: #fff;
  }
  @media (max-width: 767px) {
    margin: 10px 0;
  }
`;
const FooterLogo = styled.div`
  padding: 0px;
  img {
    width: 91px;
    @media (max-width: 767px) {
      width: 70px;
    }
  }
`;

function Header(props) {
  return (
    <Container>
      <FooterLogo>
        <img src={Logo} alt="logo" />
      </FooterLogo>
      <p>All Copyrights Reserved 2020</p>
    </Container>
  );
}

export default Header;
