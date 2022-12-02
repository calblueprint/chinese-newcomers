import * as React from 'react';

import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import styles2 from './JobPostFormInputStyle';
import { Switch } from 'react-native-elements';
import { styles } from '../../screens/Drafting/styles';

interface FormInputProps extends TextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

const ControlledInput = (props: FormInputProps) => {
  const { name, label, defaultValue, ...inputProps } = props;

  const { field: actualField } = useController({ name, defaultValue });
  const { field: fieldEnable } = useController({ name: name + 'IsEnabled', defaultValue: false });

  return (
    <View>
      <View style={styles.formTop}>
        <Switch
          onValueChange={() => fieldEnable.onChange(!fieldEnable.value)}
          value={fieldEnable.value}
        />
        <Text style={styles.formText}>{label}</Text>
      </View>
      <View style={styles2.container}>
        <TextInput
          style={styles2.input}
          onChangeText={actualField.onChange}
          value={actualField.value}
          {...inputProps}
        />
      </View>
    </View>
  );
};

const JobPostFormInput = (props: FormInputProps) => {
  const { name } = props;

  if (name.length === 0) {
    const msg = 'Name must be defined';
    console.error(msg);
    return null;
  }
  return <ControlledInput {...props} />;
};

export default JobPostFormInput;
