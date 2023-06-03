import ContentLoader from "react-content-loader";
import styles from "./HiddenEventCard.module.sass";

export const HiddenEventCard = () => (
  <div className={styles.HiddenEventCard}>
    <ContentLoader
      speed={2}
      width={window.innerWidth <= 425 ? window.innerWidth : 420}
      height={window.innerHeight <= 425 ? window.innerWidth * 0.423611 + 170 : 369}
      viewBox="0 0 420 369"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width={`${window.innerWidth <= 425 ? 425 : 420}`} height={`${window.innerWidth <= 425 ? window.innerWidth * 0.423611 : 178}`} />
      <circle cx="45" cy="206" r="15" />
      <rect x="68" y="191" rx="0" ry="0" width="250" height="30" />
      <rect x="30" y="231" rx="0" ry="0" width="360" height="30" />
      <rect x="30" y="269" rx="0" ry="0" width="360" height="60" />
    </ContentLoader>
  </div>
);
