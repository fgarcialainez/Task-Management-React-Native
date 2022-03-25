import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    height: 40,
    margin: 10,
    borderWidth: 1,
  },
});

//@ts-ignore
export const Input = ({name, control, rules, ...rest}) => {
  const {field, fieldState} = useController({
    control,
    name,
    rules,
  });

  return (
    <TextInput
      {...rest}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.input, fieldState.error && {borderColor: 'red'}]}
      value={field.value}
      onChangeText={field.onChange}
      placeholder={name}
    />
  );
};
