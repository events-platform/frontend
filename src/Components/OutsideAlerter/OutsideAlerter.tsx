import React, { useRef, useEffect } from "react";

const useOutsideAlerter = (ref: any, onBlur: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

interface IOutsideAlerter {
  children: React.ReactNode,
  onBlur?: () => void
}

export const OutsideAlerter:React.FC<IOutsideAlerter> = ({ children, onBlur }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onBlur || (() => {}));

  return <div ref={wrapperRef}>{children}</div>;
};

OutsideAlerter.defaultProps = {
  onBlur: () => {}
};
