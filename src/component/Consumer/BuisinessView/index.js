import React, { useState } from "react";
import styled from "styled-components";
import BuisinessHeader from "./BuisinessHeader";
import TabsSection from "./TabsSection";
import BuisinessHeaderNotClaimed from "./BuisinessHeaderNotClaimed";
import { useSelector } from 'react-redux';
import ValueLoader from '../../../utils/loader';

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;

const BuisinessView = ({ setDisplayTab, profile, businessExists, businessId }) => {
  const loading = useSelector(state => state.business.loading);
  return (
    <>
    {loading ? <LoaderWrap><ValueLoader/></LoaderWrap>:
      <BuisinessViewContent>
        {businessExists ? (
          <BuisinessHeader setDisplayTab={setDisplayTab} />
        ) : (
          <BuisinessHeaderNotClaimed setDisplayTab={setDisplayTab} />
        )}
        <TabsSection profile={profile} businessId={businessId} />
      </BuisinessViewContent> }
    </>
  );
};

export default BuisinessView;
