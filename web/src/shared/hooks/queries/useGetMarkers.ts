import {useQuery} from '@tanstack/react-query';
import {MapService} from '@/shared/apis/map.ts';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common.ts';
import {Marker} from '@/types/domain.ts';

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: MapService.getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
