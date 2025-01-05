import type {ImageUri} from '@/types/domain.ts';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Iconicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  showOption?: boolean;
}
function PreviewImageList({
  imageUris,
  onDelete,
  onChangeOrder,
  showOption = false,
}: PreviewImageListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri, id}, index) => (
          <Pressable style={styles.imageContainer} key={`${id}_${index}`}>
            <Image
              resizeMode={'cover'}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030'
                    : 'http://10.0.2.2:3030'
                }/${uri}`,
              }}
              style={styles.image}
            />
            {showOption && (
              <>
                <Pressable
                  style={[styles.imageButton, styles.deleteButton]}
                  onPress={() => onDelete?.(uri)}>
                  <Iconicons name="close" size={16} color={colors.WHITE} />
                </Pressable>
                {index > 0 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveLeftButton]}
                    onPress={() => onChangeOrder?.(index, index - 1)}>
                    <Iconicons
                      name="arrow-back-outline"
                      size={16}
                      color={colors.WHITE}
                    />
                  </Pressable>
                )}
                {index < imageUris.length - 1 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveRightButton]}
                    onPress={() => onChangeOrder?.(index, index + 1)}>
                    <Iconicons
                      name="arrow-forward-outline"
                      size={16}
                      color={colors.WHITE}
                    />
                  </Pressable>
                )}
              </>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', paddingHorizontal: 15, gap: 15},
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {width: '100%', height: '100%'},
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

export default PreviewImageList;
