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

const BuisinessView = ({ setDisplayTab, profile, businessExists, businessId }) => {
  const loading = useSelector(state => state.business.loading);
  return (
    <>
    {loading ? <ValueLoader/>:
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
