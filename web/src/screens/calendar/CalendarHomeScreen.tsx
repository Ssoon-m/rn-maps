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

  const handleChangeMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Calendar monthYear={monthYear} onChangeMonth={handleChangeMonth} />
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
