import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useMutateCreatePost} from '@/shared/hooks/queries/useMutateCreatePost.ts';
import {useForm} from '@/shared/hooks/useForm.ts';
import {validateAddPost} from '@/shared/utils';
import {MarkerColor} from '@/types/domain.ts';
import useGetAddress from '@/shared/hooks/useGetAddress.ts';
import {useModal} from '@/shared/hooks/useModal.ts';
import usePermissions from '@/shared/hooks/usePermissions.ts';
import useImagePicker from '@/shared/hooks/useImagePicker.ts';
import HeaderButton from '@/shared/components/HeaderButton.tsx';
import InputField from '@/shared/components/InputField.tsx';
import Octicons from '@react-native-vector-icons/octicons';
import {colors} from '@/constants';
import Button from '@/shared/components/Button.tsx';
import {getDateWithSeparator} from '@/shared/utils/date.ts';
import MarkerSelector from '@/screens/map/components/MarkerSelector.tsx';
import ScoreInput from '@/screens/map/components/ScoreInput.tsx';
import ImageInput from '@/screens/map/components/ImageInput.tsx';
import PreviewImageList from '@/screens/map/components/PreviewImageList.tsx';
import DatePickerOption from '@/screens/map/components/DatePickerOption.tsx';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';
import useDetailPostStore from '@/store/useDetailPostStore.ts';
import useMutateUpdatePost from '@/shared/hooks/queries/useMutateUpdatePost.ts';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

const PostForm = ({isEdit = false, location}: PostFormProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;

  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost?.title : '',
      description: isEditMode ? detailPost?.description : '',
    },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost?.color : 'RED',
  );
  const [date, setDate] = useState<Date>(
    isEditMode ? new Date(String(detailPost?.date)) : new Date(),
  );
  const [score, setScore] = useState(isEditMode ? detailPost?.score : 5);
  const [isPicked, setIsPicked] = useState<boolean>(false);
  const address = useGetAddress(location);
  const dateOption = useModal();
  usePermissions('PHOTO');

  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost?.images : [],
  });

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
      imageUris: imagePicker.imageUris,
    };

    if (isEditMode) {
      updatePost.mutate(
        {id: detailPost?.id, body},
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }

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
  });

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
            label={
              isPicked || isEdit ? getDateWithSeparator(date, '.') : '날짜 선택'
            }
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
            returnKeyType="join"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onSelectMarker={handleSelectMarker}
          />
          <ScoreInput onChangeScore={handleChangeScore} score={score} />
          <View style={styles.imageViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.deleteImageUri}
              onChangeOrder={imagePicker.changeOrder}
              showOption={true}
            />
          </View>
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
};

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
  imageViewer: {
    flexDirection: 'row',
  },
});

export default PostForm;
