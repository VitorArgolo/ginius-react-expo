import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export const ColorButton = ({ color, activeColor, onPress, isDisabled }) => {
  const background = activeColor === color.name ? color.highlight : color.name;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: background, opacity: isDisabled ? 0.6 : 1 }]}
      onPress={() => onPress(color)}
      activeOpacity={0.6}
      disabled={isDisabled}
    />
  );
};
