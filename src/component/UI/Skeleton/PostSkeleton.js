import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './skeleton.css';

const EventsSkeleton = () => (

  <div className="skelton">
    <div class="postskelton">
    <div className="eventImage">
        <Skeleton height={53} />
      </div>
      <div className="eventText">
        <div className="title">
          <Skeleton count={1} height={12} width={200} />
        </div>
        <Skeleton count={3} height={7}  width={'90%'} />
      </div>

      </div>
  </div>
);

export default EventsSkeleton;
