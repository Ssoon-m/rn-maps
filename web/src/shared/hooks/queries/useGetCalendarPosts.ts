import {useQuery} from '@tanstack/react-query';
import {PostService, ResponseCalendarPost} from '@/shared/apis/post.ts';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common.ts';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_FAVORITE_POSTS, year, month],
    queryFn: () => PostService.getCalendarPost(year, month),
    ...queryOptions,
  });
}

export {useGetCalendarPosts};
