import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
  const address = useGetAddress(location);

  const handleSelectMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  const handleSubmit = () => {
    const body = {
      date: new Date(),
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: [],
    };
    console.log(body);
    createPost.mutate(
      {address, ...location, ...body},
      {onSuccess: () => navigation.goBack(), onError: err => console.log(err)},
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton labelText="등록" onPress={handleSubmit} />
      ),
    });
  }, []);

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
          <Button variant="outlined" size="large" label="날짜 선택" />
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
            markerColor={markerColor}
            onSelectMarker={handleSelectMarker}
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
