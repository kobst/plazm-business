import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../Card/card';
import './skeleton.css';

const CardSkeleton = () => (
  <a href="javascript;:" count={5}>
    <Card>
      <div className="imgSec">
        <Skeleton height={150} />
      </div>
      <div className="title">
        <Skeleton count={1} />
      </div>
    </Card>
  </a>
);

export default CardSkeleton;
