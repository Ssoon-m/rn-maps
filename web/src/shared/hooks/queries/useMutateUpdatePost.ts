import {useMutation} from '@tanstack/react-query';
import {PostService} from '@/shared/apis/post.ts';
import {queryClient} from '@/providers/ReactQueryProvider.tsx';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common.ts';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: PostService.updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.GET_CALENDAR_POSTS,
          new Date(newPost.date).getFullYear(),
          new Date(newPost.date).getMonth() + 1,
        ],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
