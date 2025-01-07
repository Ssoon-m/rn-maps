import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {colors} from '@/constants';

function CalendarHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>캘린더</Text>
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
