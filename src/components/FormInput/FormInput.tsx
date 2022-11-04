import React, { Props } from 'react';
import { TextInput } from 'react-native';
import styles from './FormInputStyles';

interface FormInputProps {
  placeholder: string;
}

const FormInput: React.FunctionComponent<FormInputProps> = (props: FormInputProps) => {
  const { placeholder } = props;

  return <TextInput style={styles.input} placeholder={placeholder} />;
};

export default FormInput;
