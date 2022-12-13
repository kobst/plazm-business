import React, {useEffect, useState} from 'react';
import Input from '../../UI/Input/Input';
import styled from 'styled-components';

const SearchWrap = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	background: #000000;
	input {
		border: 0;
		outline: 0;
		padding: 0 10px;
		width: 311px;
		height: 40px;
		font-size: 14px;
		font-weight: normal;
		box-shadow: none;
		background: #fff;
		color: #000;
		font-family: 'Roboto', sans-serif;
		::placeholder {
			color: #bdbdbd;
		}
		@media (max-width: 767px) {
			width: 100%;
		}
	}
	@media (max-width: 767px) {
		flex-direction: column;
		height: auto;
		padding: 10px 0;
	}
`;

const Heading = styled.h1`
	color: #ff2e79;
	font-weight: 700;
	font-size: 18px;
	margin: 0 0 0 20px;
	padding: 0;
	font-family: 'Roboto', sans-serif;
	width: calc(100% - 350px);
	@media (max-width: 767px) {
		margin: 0 auto 10px;
		width: 100%;
		text-align: center;
		font-size: 16px;
	}
`;

const RightSearchWrap = styled.div`
	display: flex;
	@media (max-width: 767px) {
		width: 90%;
	}
`;

const SearchBar = ({setOffset, setFilterSelected, setDisplayTab}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchData);
  }, [searchData]);

  /** on key press handler for search */

  /** on change handler for search */
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <SearchWrap>
        <Heading>Search</Heading>
        <RightSearchWrap>
          <Input
            value={search}
            onChange={(e) => onChangeSearch(e)}
            disabled={loader}
            placeholder="Search"
          />
        </RightSearchWrap>
      </SearchWrap>
    </>
  );
};

export default SearchBar;
