import React, { Props } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

interface PhoneNumberInputProps {
  placeholder: string;
  value: string;
  onChangeText: any;
}

const NumberInput: React.FunctionComponent<PhoneNumberInputProps> = (
  props: PhoneNumberInputProps
) => {
  const { placeholder, onChangeText } = props;

  return <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} />;
};

export default NumberInput;
