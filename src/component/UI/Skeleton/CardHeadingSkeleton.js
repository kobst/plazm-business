import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../Card/card';
import './skeleton.css';

function CardSkeleton() {
  return (
    <a className="skelton" href="javascript;:" count={5}>
      <Card>
        <div className="imgSec">
          <Skeleton height={150} />
        </div>
        <div className="title">
          <Skeleton count={1} />
        </div>
        <div className="type">
          <Skeleton count={1} height={7} />
        </div>
      </Card>
    </a>
  );
}

export default CardSkeleton;
