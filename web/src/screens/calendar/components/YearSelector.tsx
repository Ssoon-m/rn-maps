import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, numbers} from '@/constants';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useEffect, useRef, useState} from 'react';

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}
function YearSelector({
  isVisible,
  currentYear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
  const flatListData = Array.from(
    {
      length: numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
    },
    (_, index) => ({
      id: index,
      num: index + numbers.MIN_CALENDAR_YEAR,
    }),
  );
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const index = flatListData.findIndex(data => data.num === currentYear);
    const currentRow = Math.floor(
      index / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
    );
    const scrollToY = currentRow * 50;
    setScrollY(scrollToY);
  }, [isVisible, currentYear]);

  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <View style={styles.yearsContainer}>
            <FlatList
              contentOffset={{x: 0, y: scrollY}}
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
              data={flatListData}
              renderItem={({item}) => (
                <Pressable
                  key={item.num}
                  onPress={() => onChangeYear(item.num)}
                  style={[
                    styles.yearButton,
                    currentYear === item.num && styles.currentYearButton,
                  ]}>
                  <Text
                    style={[
                      styles.yearText,
                      currentYear === item.num && styles.currentYearText,
                    ]}>
                    {item.num}
                  </Text>
                </Pressable>
              )}
              keyExtractor={item => String(item.num)}
              numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
            />
          </View>
          <Pressable style={styles.closeButton} onPress={hide}>
            <Text style={styles.closeText}>닫기</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={colors.BLACK}
            />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  yearsContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    maxHeight: 200,
    backgroundColor: colors.WHITE,
  },
  yearButton: {
    width: 80,
    height: 40,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.GRAY_700,
  },
  currentYearText: {
    color: colors.WHITE,
    fontWeight: '600',
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.GRAY_500,
  },
  closeText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
  currentYearButton: {
    backgroundColor: colors.PINK_700,
    borderColor: colors.PINK_700,
  },
});

export default YearSelector;
