import React, {useRef, useEffect} from 'react';

const ScrollToBottom1 = () => {
  const elementRef1 = useRef(null);
  useEffect(() =>
    elementRef1.current.scrollIntoView({behavior: 'smooth', block: 'center'}),
  );
  return <div ref={elementRef1} />;
};

export default ScrollToBottom1;
