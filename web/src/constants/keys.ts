const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
  POST: 'post',
  GET_POST: 'getPost',
  FAVORITE: 'favorite',
  GET_FAVORITE_POSTS: 'getFavoritePosts',
  SEARCH: 'search',
  GET_SEARCH_POSTS: 'getSearchPosts',
  GET_CALENDAR_POSTS: 'getCategoryPosts',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKeys, storageKeys};
