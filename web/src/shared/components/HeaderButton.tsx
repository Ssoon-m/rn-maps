import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import {colors} from '@/constants';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: React.ReactNode;
  hasError?: boolean;
}
function HeaderButton({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) {
  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.PINK_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});

export default HeaderButton;
