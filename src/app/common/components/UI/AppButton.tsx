import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IUiButton, IUiText } from '~/src/app/models/ui';
import { colors, sizes } from '~/src/app/common/constants';
import { handleMargins, handlePaddings } from '~/src/app/utils/ui';

interface IChild extends JSX.Element, IUiText {}

export function AppButton(props: IUiButton) {
  const {
    style,
    opacity,
    color,
    shadow,
    children,
    // property of Button
    padding,
    margin,
    disabled = false,
    newRef,
    ...other
  } = props;

  const needRender = !!disabled;

  const buttonStyles = [
    styles.button,
    shadow && styles.shadow,
    color && styles[color as keyof typeof styles], // predefined styles colors for backgroundColor
    color &&
      !styles[color as keyof typeof styles] && { backgroundColor: color }, // custom backgroundColor
    disabled && styles.disabled,
    margin && { ...handleMargins(margin) },
    padding && { ...handlePaddings(padding) },
    // yellow && styles.yellow,
  ];

  const isTextInput = (child: IChild) => ['AppText'].includes(child.type.name);

  function renderChildren(): React.ReactNode {
    return React.Children.map(children as IChild[], (child: IChild) => {
      if (isTextInput(child)) {
        return React.cloneElement(child, {
          disabled: disabled,
        });
      }
      return child;
    });
  }

  return (
    <TouchableOpacity
      ref={newRef}
      disabled={disabled}
      style={[buttonStyles, style]}
      activeOpacity={disabled ? 0 : opacity || 0.8}
      {...other}>
      {needRender ? renderChildren() : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: sizes.button.radius,
    padding: wp(sizes.button.padding),
    backgroundColor: colors.secondary,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  disabled: { backgroundColor: colors.button.disable },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  black: { backgroundColor: colors.black },
  white: { backgroundColor: colors.white },
});
