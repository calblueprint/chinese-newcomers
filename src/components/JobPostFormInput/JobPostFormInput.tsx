import * as React from 'react';

import { TextInput, TextInputProps, View } from 'react-native';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
import { useController, UseControllerProps } from 'react-hook-form';
import styles from './JobPostFormInputStyle';

interface FormInputProps extends TextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}


function ControlledInput(props: FormInputProps) {
  const { name, label, defaultValue, rules, ...inputProps } = props;

  const { field } = useController({ name, defaultValue, rules });

  return (
    <View style={styles.container}>
      <AutoGrowTextInput
        style={styles.input}
        onChangeText={field.onChange}
        value={field.value}
        {...inputProps}
      />
    </View>
  );
}

function JobPostFormInput(props: FormInputProps) {
  const { name } = props;

  if (name.length === 0) {
    const msg = 'Name must be defined';
    console.error(msg);
    return null;
  }
  return <ControlledInput {...props} />;
}

export default JobPostFormInput;
