const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  KAKAO_LOGIN: 'KakaoLogin',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'SearchLocation',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  EDIT_POST: 'EditPost',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedTabNavigations = {
  FEED_HOME: 'FeedTabHome',
  FEED_SEARCH: 'FeedSearch',
  FEED_FAVORITE: 'FeedFavorite',
} as const;

export {
  mainNavigations,
  authNavigations,
  mapNavigations,
  feedNavigations,
  feedTabNavigations,
};
