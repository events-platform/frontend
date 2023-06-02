import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const Header = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  return viewportWidth >= 700 ? <DesktopHeader /> : <MobileHeader />;
};
