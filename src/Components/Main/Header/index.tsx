import { FC, useState, useEffect } from "react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

interface HeaderProps {
  name?: string,
  city?: string,
  isSignedIn?: boolean,
  avatarUrl?: string
}

export const Header: FC<HeaderProps> = ({ name, city, isSignedIn, avatarUrl }) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportWidth >= 700 ? <DesktopHeader name={name} city={city} isSignedIn={isSignedIn} avatarUrl={avatarUrl} /> : <MobileHeader />;
};
