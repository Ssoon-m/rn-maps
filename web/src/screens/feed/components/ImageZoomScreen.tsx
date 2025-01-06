import useDetailPostStore from '@/store/useDetailPostStore.ts';
import ImageCarousel from '@/shared/components/ImageCarousel.tsx';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';
import {feedNavigations} from '@/constants';
type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;
function ImageZoomScreen({route}: ImageZoomScreenProps) {
  const {index} = route.params;
  const {detailPost} = useDetailPostStore();
  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
}

export default ImageZoomScreen;
