import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '@/constants';
import Calendar from '@/screens/calendar/components/Calendar.tsx';
import {
  getMonthYearDetails,
  getNewMonthYear,
} from '@/screens/calendar/utils/date.ts';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);
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
        onChangeMonth={handleChangeMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
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
