import * as React from 'react';
import { GestureResponderEvent, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

function StyledButton({
  text,
  buttonStyle,
  textStyle,
  onPress,
}: {
  text: string;
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, buttonStyle]}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}
export default StyledButton;
