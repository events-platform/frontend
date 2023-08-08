import { FC } from "react";
import styles from "./Notifications.module.sass";

interface NotificationsProps {
  number: number
}

export const Notifications: FC<NotificationsProps> = ({ number }) => {
  return (
    <div className={styles.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          fill="#fff"
          d="M11.75 10.998h-.375V5.686a4.374 4.374 0 00-3.75-4.33V.748a.625.625 0 10-1.25 0v.608a4.374 4.374 0 00-3.75 4.33v5.312H2.25a.5.5 0 00-.5.5v.5c0 .069.056.125.125.125H5.25a1.751 1.751 0 003.5 0h3.375a.125.125 0 00.125-.125v-.5a.5.5 0 00-.5-.5zM7 12.873a.75.75 0 01-.75-.75h1.5a.75.75 0 01-.75.75zm-3.25-1.875V5.686c0-.87.338-1.685.952-2.299A3.228 3.228 0 017 2.436c.869 0 1.684.337 2.298.951.614.614.952 1.43.952 2.299v5.312h-6.5z"
        ></path>
      </svg>
      {number > 0
        ? <div className={styles.number}>
          {number}
        </div>
        : null}
    </div>
  );
};
