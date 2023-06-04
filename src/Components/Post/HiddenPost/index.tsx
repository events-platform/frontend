import ContentLoader from "react-content-loader";

export const HiddenPost = () => (
  <ContentLoader
    speed={2}
    width={1440}
    height={4320}
    viewBox="0 0 1440 4320"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="38" rx="0" ry="0" width="1440" height="610" />
    <rect x="40" y="688" rx="45" ry="45" width="1360" height="80" />
    <rect x="40" y="818" rx="0" ry="0" width="300" height="30" />
    <rect x="40" y="863" rx="0" ry="0" width="1360" height="3450" />
  </ContentLoader>
);
