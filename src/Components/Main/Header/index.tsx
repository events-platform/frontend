import { FC } from "react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface HeaderProps {
  name?: string,
  city?: string,
  isSignedIn?: boolean,
  avatarUrl?: string
}

export const Header: FC<HeaderProps> = ({ name, city, isSignedIn, avatarUrl }) => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  return viewportWidth >= 700 ? <DesktopHeader name={name} city={city} isSignedIn={isSignedIn} avatarUrl={avatarUrl} /> : <MobileHeader />;
};
