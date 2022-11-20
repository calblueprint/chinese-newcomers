import React, { Props } from 'react';
import { TextInput } from 'react-native';
import styles from './FormInputStyle';

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: any;
}

const FormInput: React.FunctionComponent<FormInputProps> = (props: FormInputProps) => {
  const { placeholder, value, onChangeText } = props;

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default FormInput;
