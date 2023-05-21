import { FC } from "react";
interface IStar {
  width?: string,
  height?: string
}
export const Star: FC<IStar> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 28 26"
    >
      <path
        stroke="#fff"
        strokeWidth="2"
        d="M14 3.236l2.192 6.747.225.69h7.82l-5.739 4.17-.588.428.225.69 2.192 6.747-5.74-4.17-.587-.427-.588.427-5.739 4.17 2.192-6.746.225-.691-.588-.428-5.74-4.17h7.821l.225-.69L14 3.236z"
      ></path>
    </svg>
  );
};

Star.defaultProps = {
  width: "28px",
  height: "26px"
};
