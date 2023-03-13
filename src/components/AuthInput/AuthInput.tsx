import * as React from 'react';

import { TextInput, TextInputProps, View } from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import styles from './styles';

interface AuthInputProps extends TextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
  hasError: boolean;
}

function ControlledInput(props: AuthInputProps) {
  const { name, label, hasError, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, defaultValue });

  return (
    <View style={styles.container}>
      <TextInput
        style={hasError ? styles.inputWithError : styles.input}
        onChangeText={field.onChange}
        value={field.value}
        {...inputProps}
      />
    </View>
  );
}

function AuthInput(props: AuthInputProps) {
  const { name } = props;

  if (name.length === 0) {
    const msg = 'Name must be defined';
    console.error(msg);
    return null;
  }
  return <ControlledInput {...props} />;
}

export default AuthInput;
