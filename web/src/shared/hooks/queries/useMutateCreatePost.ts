import {UseMutationCustomOptions} from '@/types/common.ts';
import {useMutation} from '@tanstack/react-query';
import {PostService} from '@/shared/apis/post.ts';
import {queryClient} from '@/providers/ReactQueryProvider.tsx';
import {queryKeys} from '@/constants';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: PostService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
}

export {useMutateCreatePost};
