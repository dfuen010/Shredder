import React from 'react';
import {View, TextInput, StyleSheet, FlexAlignType} from 'react-native';

interface Props {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  height: number;
  width: number;
  radius: number;
  margin: number;
  keyboardType: string;
  color: string;
  align: 'auto' | FlexAlignType | undefined;
}

const CustomInput = (props: Props) => {
  return (
    <View style={styles(props).container}>
      <TextInput
        value={props.value}
        onChangeText={props.setValue}
        placeholder={props.placeholder}
        style={styles(props).input}
      />
    </View>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.color,
      width: props.width,
      height: props.height,
      alignSelf: props.align,

      borderColor: 'e8e8e8',
      borderWidth: 1,
      borderRadius: props.radius,

      paddingHorizontal: 10,
      marginVertical: props.margin,
    },

    input: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 0,
      keyboardType: props.keyboardType,
      color: 'red',
    },
  });

export default CustomInput;
