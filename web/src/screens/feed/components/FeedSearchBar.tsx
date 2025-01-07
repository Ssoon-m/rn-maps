import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';
import {useSearchKeywordContext} from '@/screens/feed/context/searchKeywordContext.ts';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

const FeedSearchBar = () => {
  const {search, setSearch} = useSearchKeywordContext();
  const handleChangeText = (text: string) => {
    setSearch(text);
  };
  const ref = useRef<TextInput>(null);
  const navigation = useNavigation<Navigation>();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.menuButtonContainer}
          onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" color={colors.BLACK} size={25} />
        </Pressable>

        <Pressable
          style={styles.inputContainer}
          onPress={() => ref.current?.focus()}>
          <View style={styles.innerContainer}>
            <TextInput
              ref={ref}
              style={styles.input}
              placeholderTextColor={colors.GRAY_500}
              autoCapitalize="none" // 자동 대문자 방지
              spellCheck={false} // 입력중 철자 검사
              autoCorrect={false} //입력중 자동 수정 기능
              placeholder="주소 또는 제목으로 검색"
              inputMode="text"
              autoFocus
              blurOnSubmit={false}
              value={search}
              onChangeText={handleChangeText}
            />
            <View style={styles.iconContainer}>
              <Ionicons name="search" size={24} color={colors.BLACK} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  menuButtonContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
    borderRadius: 3,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    paddingRight: 25,
  },
  input: {
    fontSize: 15,
    color: colors.BLACK,
    padding: 0,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
  },
});

export default FeedSearchBar;
