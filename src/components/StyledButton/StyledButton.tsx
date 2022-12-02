import styles from './styles';
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const StyledButton = ({
  text,
  buttonStyle,
  textStyle,
  onPress,
  activeOpacity
}: {
  text: string;
  buttonStyle: any;
  textStyle: any;
  onPress: any;
  activeOpacity: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, buttonStyle]}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
export default StyledButton;
