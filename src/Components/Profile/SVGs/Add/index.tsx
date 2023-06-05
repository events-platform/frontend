import { FC } from "react";

interface IAddSVG {
  fill?: string;
  viewBox?: string;
}

export const AddSVG: FC<IAddSVG> = ({ fill, viewBox }) => {
  return (
    <svg width="14" height="15" viewBox={viewBox} fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M7.46838 1.77576H6.53088C6.44755 1.77576 6.40588 1.81742 6.40588 1.90076V6.80701H1.75C1.66667 6.80701 1.625 6.84867 1.625 6.93201V7.86951C1.625 7.95284 1.66667 7.99451 1.75 7.99451H6.40588V12.9008C6.40588 12.9841 6.44755 13.0258 6.53088 13.0258H7.46838C7.55172 13.0258 7.59338 12.9841 7.59338 12.9008V7.99451H12.25C12.3333 7.99451 12.375 7.95284 12.375 7.86951V6.93201C12.375 6.84867 12.3333 6.80701 12.25 6.80701H7.59338V1.90076C7.59338 1.81742 7.55172 1.77576 7.46838 1.77576Z" fill="white"/>
    </svg>
  );
};

AddSVG.defaultProps = {
  fill: "none",
  viewBox: "0 0 14 15"
};
