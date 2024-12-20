import {httpClient} from '@/shared/lib/http-client.ts';
import {ImageUri, Post} from '@/types/domain.ts';

type ResponsePost = Post & {image: ImageUri[]};
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

export class PostService {
  static async createPost(body: RequestCreatePost) {
    return httpClient.post<ResponsePost>('/posts', body).then(res => res.data);
  }
}
