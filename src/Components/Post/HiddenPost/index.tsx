import ContentLoader from "react-content-loader";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const HiddenPost = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  return (
    <ContentLoader
      speed={2}
      width={`${viewportWidth}`}
      height={`${window.innerHeight * 1.5}`}
      viewBox={`0 0 ${viewportWidth} ${window.innerHeight * 1.5}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width={`${viewportWidth}`} height={`${window.innerHeight * 1.5}`} />
    </ContentLoader>
  );
};
