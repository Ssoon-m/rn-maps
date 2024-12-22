import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator.tsx';
import {colors, mapNavigations} from '@/constants';
import InputField from '@/shared/components/InputField.tsx';
import Octicons from '@react-native-vector-icons/octicons';
import Button from '@/shared/components/Button.tsx';
import {useForm} from '@/shared/hooks/useForm.ts';
import {validateAddPost} from '@/shared/utils';
import HeaderButton from '@/shared/components/HeaderButton.tsx';
import {useMutateCreatePost} from '@/shared/hooks/queries/useMutateCreatePost.ts';
import {MarkerColor} from '@/types/domain.ts';
import useGetAddress from '@/shared/hooks/useGetAddress.ts';
import MarkerSelector from '@/screens/map/components/MarkerSelector.tsx';
import ScoreInput from '@/screens/map/components/ScoreInput.tsx';
import DatePickerOption from '@/screens/map/components/DatePickerOption.tsx';
import {getDateWithSeparator} from '@/shared/utils/date.ts';
import {useModal} from '@/shared/hooks/useModal.ts';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState<Date>(new Date());
  const [isPicked, setIsPicked] = useState<boolean>(false);
  const address = useGetAddress(location);
  const dateOption = useModal();

  const handleSelectMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: [],
    };
    createPost.mutate(
      {address, ...location, ...body},
      {onSuccess: () => navigation.goBack(), onError: err => console.log(err)},
    );
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton labelText="등록" onPress={handleSubmit} />
      ),
    });
  }, []);

  const handleChangeDate = (date: Date) => {
    setDate(date);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name={'location'} size={16} color={colors.GRAY_500} />
            }
          />
          <Button
            variant="outlined"
            size="large"
            label={isPicked ? getDateWithSeparator(date, '.') : '날짜 선택'}
            onPress={dateOption.show}
          />
          <InputField
            autoFocus
            placeholder="제목을 입력하세요."
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline={true}
            secureTextEntry
            returnKeyType="join"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onSelectMarker={handleSelectMarker}
          />
          <ScoreInput onChangeScore={handleChangeScore} score={score} />
          <DatePickerOption
            isVisible={dateOption.isVisible}
            date={date}
            onDateChange={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default AddPostScreen;
