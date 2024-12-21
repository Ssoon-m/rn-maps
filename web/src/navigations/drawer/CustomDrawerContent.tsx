import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '@/constants';
import useAuth from '@/shared/hooks/queries/useAuth.ts';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation, getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} =
    (getProfileQuery.data as any) || {};

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {imageUri === null && kakaoImageUri === null && (
              <View style={styles.userImageEmpty} />
            )}
            {imageUri === null && !!kakaoImageUri && (
              <Image style={styles.userImage} source={{uri: kakaoImageUri}} />
            )}
            {imageUri !== null && (
              <Image style={styles.userImage} source={{uri: imageUri}} />
            )}
          </View>

          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
        <Pressable
          onPress={handleLogout}
          style={{alignItems: 'flex-end', padding: 10}}>
          <Text>로그아웃</Text>
        </Pressable>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userImageEmpty: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.GRAY_200,
    borderRadius: '100%',
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nameText: {
    color: colors.BLACK,
  },
});

export default CustomDrawerContent;
