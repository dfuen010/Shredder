import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface Props {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  height: number;
  width: number;
  radius: number;
  margin: number;
  keyboardType: string;
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
      backgroundColor: 'white',
      width: '75%',
      alignSelf: 'center',

      borderColor: 'e8e8e8',
      borderWidth: 1,
      borderRadius: props.radius,

      paddingHorizontal: 10,
      marginVertical: props.margin,
    },

    input: {
      height: props.height,
      width: props.width,
      padding: 0,
      keyboardType: props.keyboardType,
    },
  });

export default CustomInput;
