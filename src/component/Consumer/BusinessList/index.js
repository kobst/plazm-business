import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import ValueLoader from "../../../utils/loader";
import { IoMdClose } from "react-icons/io";
import Input from "../../UI/Input/Input";
import DisplayFavoriteBusiness from "./displayFavoriteBusiness";
import { fetchUserFavoritesBusiness } from "../../../reducers/userReducer";

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

  @media (max-width: 767px) {
    padding: 15px;
  }
  h3 {
    color: #ffffff;
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
    @media (max-width: 767px) {
      font-size: 13px;
    }
  }
  .dashed {
    border-bottom: 0.5px dashed #ffffff;
    margin-bottom: 2%;
  }

  input {
    border: 0;
  }
`;

const HeadingWrap = styled.div`
  padding: 30px;
`;

const BusinessListWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0;
  flex-direction: column;
  overflow: hidden;
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

const NoData = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  text-align: center;
`;
/*
 * @desc: to display all business lists
 */
const BusinessList = ({ setDisplayTab }) => {
  const [search, setSearch] = useState("");
  const [favoriteBusinessFiltered, setFavoriteBusinessFiltered] = useState([]);
  const user = useSelector((state) => state.user.user);
  const loadingFavoriteBusiness = useSelector(
    (state) => state.user.loadingFavoriteBusiness
  );
  const favoriteBusiness = useSelector((state) => state.user.favoriteBusiness);
  const dispatch = useDispatch();

  const userFavorites =
    favoriteBusinessFiltered.length > 0
      ? favoriteBusinessFiltered
      : search !== ""
      ? []
      : favoriteBusiness;

  /** favorites search functionality implemented */
  useEffect(() => {
    setFavoriteBusinessFiltered(
      favoriteBusiness.filter(
        (entry) =>
          entry.favorites.company_name
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
      )
    );
  }, [search, favoriteBusiness]);

  useEffect(() => {
    dispatch(fetchUserFavoritesBusiness(user._id));
  }, [user, dispatch]);

  /** on change handler for search */
  const searchList = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      {loadingFavoriteBusiness ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BuisinessViewContent>
          <HeadingWrap>
            <CloseDiv>
              <IoMdClose onClick={() => setDisplayTab(false)} />
            </CloseDiv>
            <h3>Favorites</h3>
            <div className="dashed" />
            <Input
              placeholder="Search Favorites"
              onChange={(e) => searchList(e)}
            />
          </HeadingWrap>
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={860}
            thumbMinSize={30}
          >
            <BusinessListWrap>
              {userFavorites.length > 0 ? (
                userFavorites.map((i, key) => (
                  <DisplayFavoriteBusiness data={i} key={key} />
                ))
              ) : (
                <NoData>No Business To Display</NoData>
              )}
            </BusinessListWrap>
          </Scrollbars>
        </BuisinessViewContent>
      )}
    </>
  );
};

export default BusinessList;
