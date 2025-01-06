import {UseMutationCustomOptions} from '@/types/common.ts';
import {useMutation} from '@tanstack/react-query';
import {PostService} from '@/shared/apis/post.ts';
import {queryClient} from '@/providers/ReactQueryProvider.tsx';
import {queryKeys} from '@/constants';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: PostService.updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;
