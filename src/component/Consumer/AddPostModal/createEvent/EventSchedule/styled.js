import styled from "styled-components";

export const DaysWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  margin: 0 10px;
  max-width: 260px;
  a {
    background: transparent;
    border-radius: 3px;
    color: #fff;
    font-weight: 600;
    font-size: 9px;
    line-height: 11px;
    cursor: pointer;
    padding: 5px 7px 7px;
    text-transform: uppercase;
    &.blueBg {
      background: #3f3777;
    }
    &.ColrRed {
      color: #fff;
      background: #136ef1;
      border-radius: 3px;
    }
    &:first-child {
      background: transparent;
      color: #EE3840;
    }
  }
`;
