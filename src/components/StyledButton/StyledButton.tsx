import styles from './styles';
import * as React from 'react';
import { Text, Pressable } from 'react-native';

const StyledButton = ({
  text,
  buttonStyle,
  textStyle,
  onPress
}: {
  text: string;
  buttonStyle: any;
  textStyle: any;
  onPress: any;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.buttonContainer, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
};
export default StyledButton;
