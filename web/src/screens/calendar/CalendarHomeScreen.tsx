import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '@/constants';
import Calendar from '@/screens/calendar/components/Calendar.tsx';
import {
  getMonthYearDetails,
  getNewMonthYear,
} from '@/screens/calendar/utils/date.ts';
import {useGetCalendarPosts} from '@/shared/hooks/queries/useGetCalendarPosts.ts';
import EventList from '@/screens/calendar/components/EventList.tsx';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDay());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }
  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleChangeMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleChangeMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        moveToToday={moveToToday}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
