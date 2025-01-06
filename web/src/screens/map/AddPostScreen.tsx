import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator.tsx';
import {mapNavigations} from '@/constants';

import PostForm from '@/screens/map/components/PostForm.tsx';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;

  return <PostForm location={location} />;
}

export default AddPostScreen;
