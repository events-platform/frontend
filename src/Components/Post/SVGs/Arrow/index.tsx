import { FC } from "react";

interface ArrowProps {
  size: number
}

export const Arrow: FC<ArrowProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 30 30"
    >
      <path
        fill="#fff"
        fillOpacity="0.88"
        d="M29.463 13.473H5.956l14.07-12.215a.32.32 0 00-.208-.562H16.26a.645.645 0 00-.422.156L.655 14.027a1.284 1.284 0 000 1.94l15.272 13.256c.06.052.133.08.21.08h3.676a.32.32 0 00.209-.563L5.954 16.526h23.508a.322.322 0 00.322-.321v-2.411a.322.322 0 00-.322-.321z"
      ></path>
    </svg>
  );
};
