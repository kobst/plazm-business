import React from "react";

const DiscoverList = ({ setDiscoverBtn }) => {
  return (
    <>
      <button onClick={() => setDiscoverBtn(false)}>Back</button>
      <h1>Discover Page</h1>;
    </>
  );
};

export default DiscoverList;
