import React from 'react';
import {TextInput, StyleSheet, Switch} from 'react-native';
import {useController} from 'react-hook-form';

export enum FormControlType {
  TextInputControl = 1,
  SwitchControl,
}

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 10,
    height: 40,
    margin: 10,
    borderWidth: 1,
  },
  switchInput: {
    paddingHorizontal: 10,
    margin: 10,
  },
});

//@ts-ignore
export const FormControl = ({type, name, control, rules, ...rest}) => {
  const {field, fieldState} = useController({
    control,
    name,
    rules,
  });

  switch (type) {
    case FormControlType.TextInputControl:
      return (
        <TextInput
          {...rest}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.textInput, fieldState.error && {borderColor: 'red'}]}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={name}
        />
      );
    case FormControlType.SwitchControl:
      return (
        <Switch
          {...rest}
          onValueChange={field.onChange}
          style={styles.switchInput}
          value={field.value}
        />
      );
    default:
      return <React.Component />;
  }
};
