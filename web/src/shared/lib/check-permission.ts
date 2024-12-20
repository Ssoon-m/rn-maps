import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Alert, Linking, Platform} from 'react-native';
import {alerts} from '@/constants';

export type PermissionType = 'LOCATION' | 'PHOTO';
type PermissionOS = {
  [key in PermissionType]: Permission;
};
const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

export const checkPermission = async (type: PermissionType) => {
  const isAndroid = Platform.OS === 'android';
  const permissionsOS =
    Platform.OS === 'android' ? androidPermissions[type] : iosPermissions[type];

  const checked = await check(permissionsOS);

  const showPermissionAlert = () => {
    Alert.alert(
      alerts[`${type}_PERMISSION`].TITLE,
      alerts[`${type}_PERMISSION`].DESCRIPTION,
      [
        {
          text: '설정하기',
          onPress: () => Linking.openSettings(),
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };

  switch (checked) {
    case RESULTS.DENIED:
      if (isAndroid) {
        showPermissionAlert();
      }
      await request(permissionsOS);
      break;
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
      showPermissionAlert();
      break;
    default:
      break;
  }
};
