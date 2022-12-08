import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import BuisinessHeader from './BuisinessHeader';
import TabsSection from './TabsSection';
import {useDispatch, useSelector} from 'react-redux';
import BuisinessProfileDetails from './BuisinessProfileDetails';
import ValueLoader from '../../../utils/loader';
import {setSideFilters} from '../../../reducers/businessReducer';
import useStore from '../useState/index';
import GlobalSearchBox from '../GlobalSearch/GlobalSearchBox';

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

const BusinessWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BuisinessView = ({
  setDisplayTab,
  // profile,
  // businessExists,
  businessId,
  // searchIndex,
  // setTabIndex,
  // setSearchIndex,
  // myFeedIndex,
  // setMyFeedIndex,
  // listIndex,
  // setListIndex,
  // favoriteIndex,
  // setFavoriteIndex,
  // setSelectedListId,
}) => {
  const loading = useSelector((state) => state.business.loading);
  const showSearchBar = useSelector((state) => state.globalSearch.displayBar);
  const businessProfile = useSelector((state) => state.business.business);
  const flag = useSelector((state) => state.business.flag);
  const [displayBusinessProfile, setDisplayBusinessProfile] = useState(false);
  const setSelectedBusiness = useStore((state) => state.setSelectedPlace);
  // const businessProfile = useStore((state) => state.businessDetailProfile)

  useEffect(() => {
    if (businessProfile[0]) {
      const deepClone = JSON.parse(JSON.stringify(businessProfile[0]));
      deepClone.businessLocation = deepClone.location;

      // console.log("XXXX   business view coordinates XXXXX");
      // console.log(deepClone);

      setSelectedBusiness(deepClone);
    }
  }, [businessProfile]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSideFilters());
  }, [dispatch]);
  return (
    <>
      {!loading &&
      // !businessExists &&
      ((!flag && businessProfile && businessProfile.length === 0) ||
        (!businessProfile && !loading)) ? (
        <h3>Business Does Not Exist</h3>
      ) : loading ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BusinessWrap>
          <div style={{width: '100%'}}>
            {showSearchBar && (
              <GlobalSearchBox setOffset={() => {}} type={'Business Search'} />
            )}
          </div>
          <div style={{width: '100%'}}>
            <BuisinessViewContent>
              {businessProfile &&
                businessProfile.length > 0 &&
                (displayBusinessProfile ? (
                  <BuisinessProfileDetails
                    displayBusinessProfile={displayBusinessProfile}
                    setDisplayBusinessProfile={setDisplayBusinessProfile}
                    setDisplayTab={setDisplayTab}
                    // searchIndex={searchIndex}
                    // setTabIndex={setTabIndex}
                    // setSearchIndex={setSearchIndex}
                    // myFeedIndex={myFeedIndex}
                    // setMyFeedIndex={setMyFeedIndex}
                    // favoriteIndex={favoriteIndex}
                    // setFavoriteIndex={setFavoriteIndex}
                    // listIndex={listIndex}
                    // setListIndex={setListIndex}
                  />
                ) : (
                  <BuisinessHeader
                    setDisplayTab={setDisplayTab}
                    setDisplayBusinessProfile={setDisplayBusinessProfile}
                    // searchIndex={searchIndex}
                    // setTabIndex={setTabIndex}
                    // setSearchIndex={setSearchIndex}
                    // myFeedIndex={myFeedIndex}
                    // setMyFeedIndex={setMyFeedIndex}
                    // listIndex={listIndex}
                    // setListIndex={setListIndex}
                    // favoriteIndex={favoriteIndex}
                    // setFavoriteIndex={setFavoriteIndex}
                  />
                ))}
              {!displayBusinessProfile &&
                !loading &&
                businessProfile &&
                businessProfile.length > 0 && (
                <TabsSection
                  // profile={profile}
                  businessId={businessId}
                  // setSelectedListId={setSelectedListId}
                />
              )}
            </BuisinessViewContent>
          </div>
        </BusinessWrap>
      )}
    </>
  );
};

export default BuisinessView;
