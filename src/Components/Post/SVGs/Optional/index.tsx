import React from "react";

interface OptionalProps {
  color: string;
}

export const Optional: React.FC<OptionalProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        fill={color}
        d="M27.947 15.222h-2.093a1.43 1.43 0 00-1.157.59l-4.696 6.49-4.697-6.49a1.423 1.423 0 00-1.156-.59h-2.093c-.29 0-.46.33-.29.567l7.946 10.982a.355.355 0 00.576 0l7.946-10.982a.356.356 0 00-.286-.567z"
      ></path>
      <path
        fill="#5AAE81"
        d="M20 0C8.955 0 0 8.955 0 20s8.955 20 20 20 20-8.955 20-20S31.045 0 20 0zm0 36.607C10.83 36.607 3.393 29.17 3.393 20 3.393 10.83 10.83 3.393 20 3.393c9.17 0 16.607 7.437 16.607 16.607 0 9.17-7.437 16.607-16.607 16.607z"
      ></path>
    </svg>
  );
};
