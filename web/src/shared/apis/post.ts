import {httpClient} from '@/shared/lib/http-client.ts';
import {ImageUri, Post} from '@/types/domain.ts';

export type ResponsePost = Post & {images: ImageUri[]};
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
export type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};

export type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

export type ResponseCalendarPost = Record<number, CalendarPost[]>;

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
  static async deletePost(id: number) {
    return httpClient.delete(`/posts/${id}`).then(res => res.data);
  }
  static async updatePost({id, body}: RequestUpdatePost) {
    return httpClient
      .patch<ResponseSinglePost>(`/posts/${id}`, body)
      .then(res => res.data);
  }
  static async updateFavoritePost(id: number) {
    return httpClient.post<number>(`/favorites/${id}`).then(res => res.data);
  }
  static async getFavoritePosts(page: number = 1) {
    return httpClient
      .get<ResponsePost[]>(`/favorites/my`, {params: {page}})
      .then(res => res.data);
  }
  static async searchMyPosts(query: string, page: number = 1) {
    return httpClient
      .get<ResponsePost[]>(`/posts/my/search`, {
        params: {
          query,
          page,
        },
      })
      .then(res => res.data);
  }
  static async getCalendarPost(year: number, month: number) {
    return httpClient
      .get<ResponseCalendarPost>(`/posts`, {params: {year, month}})
      .then(res => res.data);
  }
}
