import {httpClient} from '@/shared/lib/http-client.ts';
import {Marker} from '@/types/domain.ts';

export class MapService {
  static async getMarkers() {
    return httpClient.get<Marker[]>('/markers/my').then(res => res.data);
  }
}
