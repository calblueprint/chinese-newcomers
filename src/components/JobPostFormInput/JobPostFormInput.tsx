import * as React from 'react';

import { TextInput, TextInputProps, View } from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import styles from './JobPostFormInputStyle';

interface FormInputProps extends TextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

const ControlledInput = (props: FormInputProps) => {
  //   const formContext = useFormContext();

  const { name, label, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, defaultValue });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={field.onChange}
        //   placeholderTextColor="#A9A9A9"
        value={field.value}
        {...inputProps}
      />
    </View>
  );
};

const JobPostFormInput = (props: FormInputProps) => {
  const { name } = props;

  //   const formContext = useFormContext();

  if (name.length === 0) {
    const msg = 'Name must be defined';
    console.error(msg);
    return null;
  }
  return <ControlledInput {...props} />;
};

export default JobPostFormInput;
