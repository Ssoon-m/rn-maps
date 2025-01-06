import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {feedNavigations} from '@/constants';

import PostForm from '@/screens/map/components/PostForm.tsx';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostForm location={location} isEdit={true} />;
}

export default EditPostScreen;
