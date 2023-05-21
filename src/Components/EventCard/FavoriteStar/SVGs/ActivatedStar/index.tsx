import { FC } from "react";
interface IActivatedStar {
  width?: string,
  height?: string
}
export const ActivatedStar: FC<IActivatedStar> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 20"
    >
      <path
        fill="#fff"
        d="M11 0l2.47 7.6h7.992l-6.466 4.698 2.47 7.601L11 15.202l-6.466 4.697 2.47-7.6L.538 7.6H8.53L11 0z"
      ></path>
    </svg>
  );
};

ActivatedStar.defaultProps = {
  width: "26",
  height: "26"
};
