import { Calendar } from "@natscale/react-calendar";
import { Value } from "@natscale/react-calendar/dist/components/calendar/Calendar";
import "@natscale/react-calendar/dist/main.css";
import React, { useState } from "react";
import styles from "./calendar.module.sass";
import { OutsideAlerter } from "../../OutsideAlerter/OutsideAlerter";

interface calendarProps {
  defaultValue: Date,
  setBeginDate: (value: Date) => void,
  setShowCalendar: (value: boolean) => void
}

export const CalendarContainer: React.FC<calendarProps> = ({ setBeginDate, setShowCalendar, defaultValue }) => {
  const [hour, sethour] = useState(defaultValue.getHours());
  const [minutes, setminutes] = useState(defaultValue.getMinutes());
  const changeTime = (date: Date, hours: number, minutes: number) => {
    const t = date;
    t.setHours(hours);
    t.setMinutes(minutes);
    setBeginDate(new Date(t.getTime()));
  };

  const onBeginDateCalendarChange = (value: Value) => {
    changeTime(value as Date, hour, minutes);
  };

  const convertTimeToFormat = (time: number): string => {
    return ("00" + time).substring(time.toString().length);
  };

  return (
    <OutsideAlerter onBlur={() => setShowCalendar(false) } >
      <div className={styles.calendar}>
        <Calendar
          value={defaultValue}
          onChange={onBeginDateCalendarChange}
        />
        <div className={styles.timePicker}>
          <div className={styles.timeHeader}>{convertTimeToFormat(hour) + ":" + convertTimeToFormat(minutes)}</div>
          <div className={styles.timeContent}>
            <div className={styles.timeValues}>
              {Array.from(Array(24).keys()).map((el, index) => {
                const time = ("00" + el).substring(el.toString().length);
                return (<div className={styles.timeElement} onClick={() => { sethour(parseInt(time)); changeTime(defaultValue, parseInt(time), minutes); }} key={index}>{time}</div>);
              })}
            </div>
            <div className={styles.timeValues}>
              {Array.from(Array(60).keys()).map((el, index) => {
                const time = ("00" + el).substring(el.toString().length);
                return (<div className={styles.timeElement} onClick={() => { setminutes(parseInt(time)); changeTime(defaultValue, hour, parseInt(time)); }} key={index}>{time}</div>);
              })}
            </div>
          </div>
        </div>
      </div>
    </OutsideAlerter>
  );
};
