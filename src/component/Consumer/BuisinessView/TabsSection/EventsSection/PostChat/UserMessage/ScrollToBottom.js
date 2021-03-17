import React, { useRef, useEffect } from "react";

const ScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() =>
    elementRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
  );
  return <div ref={elementRef} />;
};

export default ScrollToBottom;
