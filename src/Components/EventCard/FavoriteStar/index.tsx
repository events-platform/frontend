import { FC } from "react";
import { ActivatedStar, Star } from "./SVGs";
import styles from "./FavoriteStar.module.sass";

interface IFavoriteStar {
  onClick: () => void,
  favorite: boolean,
  width?: string,
  height?: string,
  starWidth?: string,
  starHeight?: string,
  style?: object
}
export const FavoriteStar: FC<IFavoriteStar> = ({ onClick, favorite, width, height, starWidth, starHeight, style }) => {
  return (
    <button className={`${styles.starBackground} ${style}`} style={{ width, height }} onClick={onClick}>
      {favorite ? <ActivatedStar width={starWidth} height={starHeight} /> : <Star width={starWidth} height={starHeight} />}
    </button>
  );
};
FavoriteStar.defaultProps = {
  width: "38px",
  height: "38px"
};
