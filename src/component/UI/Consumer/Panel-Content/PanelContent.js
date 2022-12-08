import React from 'react';
import './styles.css';

import ListDetail from '../../../Consumer/ListDescriptionView/ListDetail';

import MyFeed from '../../../Consumer/MyFeed';

import Profile from '../../../Consumer/Profile';
import HomeSearchComponent from '../../../Consumer/HomeSearch';
import BuisinessView from '../../../Consumer/BuisinessView';
import DiscoverList from '../../../Consumer/DiscoverList';

import useStore from '../../../Consumer/useState/index';

// const PanelContent = ({view}) => {
const PanelContent = () => {
  const detailId = useStore((state) => state.detailId);
  const view = useStore((state) => state.view);

  return (
    <>
      <div className="panel-content">
        {view === 'explore' && <HomeSearchComponent />}

        {view == 'my_feed' && <MyFeed />}

        {view === 'list_detail' && <ListDetail />}

        {view === 'business_detail' && (
          <BuisinessView businessId={detailId} />
        )}

        {view === 'user_detail' && <Profile userId={detailId} />}
      </div>

      {/* {view === "list_explore" && <ListMenu/>} */}
      {view === 'list_explore' && <DiscoverList />}
    </>
  );
};

export default PanelContent;
