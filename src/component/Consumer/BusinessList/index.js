import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import ValueLoader from "../../../utils/loader";
import { IoMdClose } from "react-icons/io";

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

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 30px;
  @media (max-width: 767px) {
    padding: 15px;
  }
  h3 {
    color: #ff2e9a;
    padding: 0;
    margin: 0 0 15px;
    font-size: 24px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 10px;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    :hover {
      color: #00c2ff;
      transition: all 0.2s ease-in-out 0s;
    }
    @media (max-width: 767px) {
      font-size: 13px;
    }
  }
`;

const BusinessListWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
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

/*
 * @desc: to display all business lists
 */
const BusinessList = ({setDisplayTab}) => {
  const business = useSelector((state) => state.place.place);
  const loading = useSelector((state) => state.place.loading);
  const history = useHistory();
  return (
    <>
      {loading ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BuisinessViewContent>
          <CloseDiv>
            <IoMdClose onClick={() => setDisplayTab(false)} />
          </CloseDiv>
          <h3>Business Lists</h3>
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={860}
            thumbMinSize={30}
          >
            <BusinessListWrap>
              {business.map((i,key) => (
                <p key={key} onClick={() => history.push(`/b/${i._id}`)}>
                  {i.company_name}
                </p>
              ))}
            </BusinessListWrap>
          </Scrollbars>
        </BuisinessViewContent>
      )}
    </>
  );
};

export default BusinessList;
