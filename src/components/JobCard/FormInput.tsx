import * as React from 'react';

import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps
} from 'react-hook-form';

interface FormInputProps extends TextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

const ControlledInput = (props: FormInputProps) => {
  //   const formContext = useFormContext();

  const { name, label, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, defaultValue });

  return (
    <View>
      <TextInput
        onChangeText={field.onChange}
        //   placeholderTextColor="#A9A9A9"
        value={field.value}
        {...inputProps}
      />
    </View>
  );
};

const FormInput = (props: FormInputProps) => {
  const { name } = props;

  //   const formContext = useFormContext();

  if (name.length === 0) {
    const msg = 'Name must be defined';
    console.error(msg);
    return null;
  }
  return <ControlledInput {...props} />;
};

export default FormInput;
