import styled from 'styled-components'
import SearchIcon from "../../../images/zoom-out.png";

export const TopSectionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  .BackButtonArrow {
    background: #FF2E9A;
    border-radius: 3px;
    border: 0;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 15px 0 0;
    svg {
        font-size: 28px;
        color: #fff;
    }
    :hover {
        opacity: 0.8;
    }
  }
`

export const LeftWrap = styled.div`
  display: flex;
  align-items: center;
`

export const TotalNum = styled.div`
  color: #FFFFFF;
  font-weight: 500;
  font-size: 11px;
  display: flex;
  align-items: center;
  span {
    font-weight: 700;
    color: #FF2E9A;
    margin: 0 0 0 8px;
  }
`

export const RightSearchWrap = styled.div`
  display: flex;
  max-width: 285px;
  width: 100%;
  height: 38px;
  @media (max-width: 767px) {
    max-width: 200px;
  }
  .SearchSubscriptionsInput {
    background: url(${SearchIcon}) no-repeat right 10px center #fff;
    border-radius: 2px;
    border: 1px solid #e4e4e4;
    height: 38px;
    font-size: 14px;
    padding-right: 35px;
    margin: 0;
    ::placeholder {
      color: #c8c8c8;
    }
  }
`

