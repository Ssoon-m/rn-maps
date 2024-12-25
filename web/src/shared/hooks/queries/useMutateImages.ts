import {UseMutationCustomOptions} from '@/types/common.ts';
import {useMutation} from '@tanstack/react-query';
import {PostService} from '@/shared/apis/post.ts';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: PostService.uploadImage,
    ...mutationOptions,
  });
}

export default useMutateImages;
