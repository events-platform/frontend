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
      <Calendar value={beginDateCalendar} onChange={onBeginDateCalendarChange} />
    </div>
  );
};
