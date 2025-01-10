// 년도와 월을 캘린더로 받아서 표시를 해준다.
// 몇년 몇월인지 날짜를 가져오는 util함수
import {getDateWithSeparator} from '@/shared/utils/date.ts';

function getMonthYearDetails(initialDate: Date) {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const firstDayOfWeek = startDate.getDay();
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(),
  );

  const lastDate = Number(lastDateString);

  return {month, year, startDate, firstDayOfWeek, lastDate};
}

interface MonthYear {
  month: number;
  year: number;
  startDate: Date;
  firstDayOfWeek: number;
  lastDate: number;
}

function getNewMonthYear(prevData: MonthYear, increment: number) {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );
  return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();
  return currentYear === year && currentMonth === month && currentDate === date;
}

export {getMonthYearDetails, getNewMonthYear, isSameAsCurrentDate};
export type {MonthYear};
