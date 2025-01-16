import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import useSearchLocation from '@/shared/hooks/queries/useSearchLocation.ts';
import useUserLocation from '@/screens/map/hooks/useUserLocation.ts';
import {useState} from 'react';
import {colors} from '@/constants';
import Ionicons from '@react-native-vector-icons/ionicons';
import SearchRegionResult from '@/screens/map/components/SearchRegionResult.tsx';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState('');
  const {userLocation} = useUserLocation();
  const {regionInfo} = useSearchLocation(keyword, userLocation);
  const handleChangeKeyword = (value: string) => {
    console.log(value);
    setKeyword(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoFocus
          value={keyword}
          autoCapitalize="none"
          placeholderTextColor={colors.GRAY_500}
          onChangeText={handleChangeKeyword}
          spellCheck={false} // 입력중 철자 검사
          autoCorrect={false} //입력중 자동 수정 기능
          returnKeyType="search"
          clearButtonMode="while-editing"
          placeholder="검색할 장소를 입력하세요."
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Ionicons
          name={'search'}
          color={colors.GRAY_700}
          size={20}
          onPress={() => Keyboard.dismiss()}
        />
      </View>
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
});

export default SearchLocationScreen;
