import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants';
import DayOfWeeks from '@/screens/calendar/components/DayOfWeeks.tsx';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {isSameAsCurrentDate, MonthYear} from '@/screens/calendar/utils/date.ts';
import DateBox from '@/screens/calendar/components/DateBox.tsx';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
}
export default function Calendar({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
}: CalendarProps) {
  const {month, year, lastDate, firstDayOfWeek} = monthYear;
  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>{`${year}년 ${month}월`}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>
      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDayOfWeek}, (_, i) => ({
            id: i,
            date: i - firstDayOfWeek + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthButtonContainer: {
    padding: 10,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
});
