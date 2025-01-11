import HeaderButton from '@/shared/components/HeaderButton.tsx';

function CalendarHomeHeaderRight({onPress}: {onPress: () => void}) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

export default CalendarHomeHeaderRight;
