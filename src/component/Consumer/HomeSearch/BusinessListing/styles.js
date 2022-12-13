import styled from "styled-components";

export const SearchListingContent = styled.ul`
  display: flex;
  background-color: #f3f3f3;
  align-items: flex-start;
  justify-items: center;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0 10px;
  max-height: 200px;
  position: absolute;
  z-index: 1;
  width: 96%;
  top: 51px;
  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0px;
    background: #3b3946;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 0px;
    cursor: pointer;
    width: 6px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #000;
  }
  li {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 13px;
    color: #333;
    font-weight: 500;
    &:hover {
      color: #000;
      font-weight: 600;
    }
  }
`;
