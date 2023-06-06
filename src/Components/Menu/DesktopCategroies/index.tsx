import { populars } from "../../../Pages/Menu/populars";
import styles from "../../../Pages/Menu/Menu.module.sass";
import { PopularArrow } from "../SVGs/PopularArrow";
import { Popular } from "../Popular";
import { useRef, useState } from "react";

export const DesktopCategories = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(1);

  const handlePrevButtonClick = () => {
    if (sliderRef.current) {
      if (sliderPosition !== 0 && sliderIndex - 1 > -1) {
        setSliderPosition(sliderPosition + 470);
        setSliderIndex(sliderIndex - 1);
      } else {
        setSliderPosition((-populars.length + 3) * 470);
        setSliderIndex(populars.length);
      }
    }
  };

  const handleNextButtonClick = () => {
    if (sliderRef.current) {
      if (-sliderRef.current.offsetWidth < sliderPosition && sliderIndex + 2 < populars.length) {
        setSliderPosition(sliderPosition - 470);
        setSliderIndex(sliderIndex + 1);
      } else {
        setSliderPosition(0);
        setSliderIndex(1);
      }
    }
  };

  return (
    <div className={styles.popular}>
      <div className={styles.buttons}>
        <button
          className={styles.popularArrow}
          onClick={handlePrevButtonClick}
        >
          <PopularArrow />
        </button>
        <button
          className={`${styles.popularArrow} ${styles.rightArrow}`}
          onClick={handleNextButtonClick}
        >
          <PopularArrow />
        </button>
      </div>
      <div className={styles.hidden}>
        <div
          className={styles.sliderContainer}
          style={{ transform: `translateX(${sliderPosition}px)` }}
          ref={sliderRef}
        >
          {populars.map((el) => (
            <Popular
              link={"/events"}
              key={el.id}
              name={`${el.name}`}
              type={el.type}
              backgroundImage={`url(${el.url})`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
