import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {PostService, ResponsePost} from '@/shared/apis/post.ts';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types/common.ts';

function useGetInfiniteFavoritePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => PostService.getFavoritePosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.SEARCH, queryKeys.GET_SEARCH_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfiniteFavoritePosts;
