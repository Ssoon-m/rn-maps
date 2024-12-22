import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomMarker from '@/screens/map/components/CustomMarker.tsx';
import {colors} from '@/constants';
import {MarkerColor} from '@/types/domain.ts';

interface MarkerSelectorProps {
  markerColor: MarkerColor;
  onSelectMarker: (color: MarkerColor) => void;
}

const markerColors = ['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'] as const;
function MarkerSelector({markerColor, onSelectMarker}: MarkerSelectorProps) {
  const onSelectMarkerColor = (color: MarkerColor) => {
    onSelectMarker(color);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {markerColors.map(color => {
            return (
              <Pressable
                key={color}
                style={[
                  styles.markerBox,
                  markerColor === color && styles.pressedMarker,
                ]}
                onPress={() => onSelectMarkerColor(color)}>
                <CustomMarker color={color} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.GRAY_100,
    borderRadius: 6,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerSelector;
