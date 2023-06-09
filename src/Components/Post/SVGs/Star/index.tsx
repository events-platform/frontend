import React from "react";
interface IStar {
  fill?: string
}
export const Star: React.FC<IStar> = ({ fill }) => {
  return (
    <svg
      width="16"
      height="15"
      fill="none"
      viewBox="0 0 16 15"
    >
      <path
        fill={fill}
        d="M15.073 5.164l-4.534-.66L8.513.397a.574.574 0 00-1.025 0L5.46 4.505l-4.534.659a.57.57 0 00-.316.975l3.28 3.198-.775 4.516a.57.57 0 00.829.602L8 12.323l4.056 2.132a.57.57 0 00.829-.602l-.776-4.516 3.28-3.198a.57.57 0 00-.316-.975zM10.73 8.887l.644 3.755L8 10.871l-3.373 1.773.645-3.755-2.729-2.66 3.771-.55L8 2.265 9.686 5.68l3.771.548-2.728 2.66z"
      ></path>
    </svg>
  );
};

Star.defaultProps = {
  fill: "white"
};
