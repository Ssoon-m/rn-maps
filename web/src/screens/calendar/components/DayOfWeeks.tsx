import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function DayOfWeeks() {
  return (
    <View style={styles.container}>
      {DAYS.map((dayofWeek, i) => (
        <View key={i} style={styles.item}>
          <Text
            style={[
              styles.text,
              dayofWeek === '토' && styles.saturdayText,
              dayofWeek === '일' && styles.sundayText,
            ]}>
            {dayofWeek}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: Dimensions.get('window').width / 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.BLACK,
  },
  saturdayText: {
    color: colors.BLUE_500,
  },
  sundayText: {
    color: colors.RED_500,
  },
});
