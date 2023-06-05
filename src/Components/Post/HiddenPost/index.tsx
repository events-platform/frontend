import ContentLoader from "react-content-loader";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const HiddenPost = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  return (
    <ContentLoader
      speed={2}
      width={1440}
      height={4320}
      viewBox="0 0 1440 4320"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="38" rx="0" ry="0" width={viewportWidth < 1440 ? `$${viewportWidth}` : "1440"} height={viewportWidth < 1440 ? `$${viewportWidth * 0.4423611}` : "610"} />
      <rect x="40" y="688" rx="45" ry="45" width={viewportWidth < 1440 ? `$${viewportWidth - 80}` : "1360"} height="80" />
      <rect x="40" y="818" rx="0" ry="0" width="300" height="30" />
      <rect x="40" y="863" rx="0" ry="0" width={viewportWidth < 1440 ? `$${viewportWidth - 80}` : "1360"} height="3450" />
    </ContentLoader>
  );
};
