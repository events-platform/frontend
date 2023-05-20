import { Calendar } from "@natscale/react-calendar";
import { Value } from "@natscale/react-calendar/dist/components/calendar/Calendar";
import "@natscale/react-calendar/dist/main.css";
import React, { useCallback, useState } from "react";
import { formatDate } from "../../../API/post";
import styles from "./calendar.module.sass";

interface calendarProps {
  setBeginDate: (value: string) => void,
  setShowCalendar: (value: boolean) => void
}

export const CalendarContainer: React.FC<calendarProps> = ({ setBeginDate, setShowCalendar }) => {
  const [beginDateCalendar, setbeginDateCalendar] = useState<Value>();
  const [hour, sethour] = useState("00");
  const [minutes, setminutes] = useState("00");

  const onBeginDateCalendarChange = useCallback(
    (value: Value) => {
      const yourDate = value as Date;
      setbeginDateCalendar(value);
      setBeginDate(formatDate(yourDate));
    },
    [setbeginDateCalendar]
  );
  return (
    <div className={styles.calendar}>
      <Calendar
        value={beginDateCalendar}
        onChange={onBeginDateCalendarChange}
      />
      <div className={styles.timePicker}>
        <div className={styles.timeHeader}>{hour + ":" + minutes}</div>
        <div className={styles.timeContent}>
          <div className={styles.timeValues}>
            {Array.from(Array(24).keys()).map((el, index) => {
              const time = ("00" + el).substring(el.toString().length);
              return (<div className={styles.timeElement} onClick={() => sethour(time)} key={index}>{time}</div>);
            })}
          </div>
          <div className={styles.timeValues}>
            {Array.from(Array(60).keys()).map((el, index) => {
              const time = ("00" + el).substring(el.toString().length);
              return (<div className={styles.timeElement} onClick={() => setminutes(time)} key={index}>{time}</div>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
