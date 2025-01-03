import {httpClient} from '@/shared/lib/http-client.ts';
import {ImageUri, Post} from '@/types/domain.ts';

export type ResponsePost = Post & {images: ImageUri[]};
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
export type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

export class PostService {
  static async createPost(body: RequestCreatePost) {
    return httpClient.post<ResponsePost>('/posts', body).then(res => res.data);
  }
  static async uploadImage(body: FormData) {
    return httpClient
      .post('/images', body, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => res.data);
  }
  static async getPost(id: number) {
    return httpClient
      .get<ResponseSinglePost>(`/posts/${id}`)
      .then(res => res.data);
  }
  static async getPosts(page: number = 1) {
    return httpClient
      .get<ResponsePost[]>('/posts/my', {
        params: {
          page,
        },
      })
      .then(res => res.data);
  }
}
