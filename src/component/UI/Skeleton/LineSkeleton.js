import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './skeleton.css';

function LineSkeleton() {
  return (
    <a className="skelton" href="javascript;:" count={5}>
      <div className="Line">
        <Skeleton count={5} height={7} />
      </div>
    </a>
  );
}

export default LineSkeleton;
