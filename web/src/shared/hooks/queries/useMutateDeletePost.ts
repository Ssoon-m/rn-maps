import {UseMutationCustomOptions} from '@/types/common.ts';
import {useMutation} from '@tanstack/react-query';
import {PostService} from '@/shared/apis/post.ts';
import {queryClient} from '@/providers/ReactQueryProvider.tsx';
import {queryKeys} from '@/constants';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: PostService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
