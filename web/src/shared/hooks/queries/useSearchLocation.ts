import {useEffect, useState} from 'react';
import {httpClient} from '@/shared/lib/http-client.ts';
import {LatLng} from 'react-native-maps';
import Config from 'react-native-config';

type Meta = {
  total_count: number; //	검색어에 검색된 문서 수
  pageable_count: number; //total_count 중 노출 가능 문서 수 (최대: 45)
  is_end: boolean; //	현재 페이지가  마지막 페이지인지 여부
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  }; //질의어의 지역 및 키워드 분석 정보
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

function useSearchLocation(keyword: string, location: LatLng) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [pageParam, setPageParam] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await httpClient.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json`,
          {
            params: {
              query: keyword,
              y: location.latitude,
              x: location.longitude,
              page: pageParam,
            },
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        setRegionInfo(data.documents);
      } catch (error) {
        setRegionInfo([]);
      }
    })();
  }, [keyword, location]);
  return {regionInfo};
}

export default useSearchLocation;
