import React from 'react';
import styled from 'styled-components';

const HashtagsWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Hashtags = styled.div`
  color: #000;
  font-weight: 400;
  font-size: 12px;
  line-height: normal;
  margin: 0 5px 10px 0;
  background: #f7f7f7;
  border: 0.5px dashed #000000;
  box-sizing: border-box;
  border-radius: 28px;
  padding: 4px 7px;
`;
/** display favorite business hash tags */
function BusinessHashTags({ data }) {
  return (
    <HashtagsWrap>
      {data && data.length > 0
        ? data.map((i, key) => <Hashtags key={key}>#{i}</Hashtags>)
        : null}
    </HashtagsWrap>
  );
}

export default BusinessHashTags;
