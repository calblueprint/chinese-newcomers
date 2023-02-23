import React, { Props } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

interface NumberInputProps {
  placeholder: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

function NumberInput(props: NumberInputProps) {
  const { placeholder, onChangeText } = props;

  return <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} />;
};

export default NumberInput;
