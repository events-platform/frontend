import { useState } from "react";
import { populars } from "../../../Pages/Menu/populars";
import { SecondaryButton } from "../../SecondaryButton";
import { PopularMobile } from "../PopularMobile";
import styles from "./MobileCategories.module.sass";

export const MobileCategories = () => {
  const [isExtended, setExtended] = useState(false);

  return (
    <><div className={styles.MobileCategories}>
      <PopularMobile link={"/events"}
        key={populars[0].id}
        name={`${populars[0].name}`}
        type={populars[0].type}
        backgroundImage={`url(${populars[0].urlMobile})`} />
      <PopularMobile link={"/events"}
        key={populars[1].id}
        name={`${populars[1].name}`}
        type={populars[1].type}
        backgroundImage={`url(${populars[1].urlMobile})`} />
      {isExtended
        ? null
        : <SecondaryButton height={40} text="Показаать все категории" onClick={() => setExtended(true)} />}
    </div>
    <div className={styles.MobileCategories} style={{ display: isExtended ? "flex" : "none", marginTop: "10px" }}>
      <PopularMobile link={"/events"}
        key={populars[2].id}
        name={`${populars[2].name}`}
        type={populars[2].type}
        backgroundImage={`url(${populars[2].urlMobile})`} />
      <PopularMobile link={"/events"}
        key={populars[3].id}
        name={`${populars[3].name}`}
        type={populars[3].type}
        backgroundImage={`url(${populars[3].urlMobile})`} />
      <PopularMobile link={"/events"}
        key={populars[4].id}
        name={`${populars[4].name}`}
        type={populars[4].type}
        backgroundImage={`url(${populars[4].urlMobile})`} />
    </div></>
  );
};
