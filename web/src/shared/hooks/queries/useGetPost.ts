import {UseQueryCustomOptions} from '@/types/common.ts';
import {useQuery} from '@tanstack/react-query';
import {PostService, type ResponseSinglePost} from '@/shared/apis/post.ts';
import {queryKeys} from '@/constants';

function useGetPost(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => PostService.getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
