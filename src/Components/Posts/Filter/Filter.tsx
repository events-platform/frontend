import { useState } from "react";
import { Select } from "../../PostCreation/Input";
import styles from "./Filter.module.sass";
import { getEventFormats } from "../../../API/post";
import { SecondaryButton } from "../../SecondaryButton";
import { Checkbox } from "../../CheckBox";

export const Filter = () => {
  const [category, setcategory] = useState<string>("");
  const [timeFilter, settimeFilter] = useState("По Времени");
  const [checkBox, setcheckBox] = useState(false);
  return (
    <>
      <div className={styles.postFilter}>
        <div className={styles.filterTabs}>
          {category !== "" || timeFilter !== "По Времени" ? "Фильтры:" : null}
          {category !== ""
            ? <SecondaryButton height={32} text={category} onClick={() => setcategory("")}></SecondaryButton>
            : null}
          {timeFilter !== "По Времени" ? <SecondaryButton height={32} text={timeFilter} onClick={() => settimeFilter("По Времени")}></SecondaryButton> : null}
        </div>
        <div className={styles.filterTools}>
          <Select
            placeholder="Категории"
            width="150px"
            height="32px"
            state={"Категории"}
            setState={setcategory}
            selectValues={getEventFormats()}
            selectBackGroundColor="white"
          />
          <Select
            placeholder="По Времени"
            width="220px"
            height="32px"
            state={timeFilter}
            setState={settimeFilter}
            selectValues={["от новых к старым", "от старых к новым"]}
            selectBackGroundColor="white"
          />
          <div className={styles.CheckBox}>
            <Checkbox label="Показывать прошедшие мероприятия" onChange={(val) => setcheckBox(val)} checked={checkBox} />
          </div>
        </div>
      </div>
    </>
  );
};
