import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface Props {
  title: string;
  onClick: () => void;
  color: string;
  radius: number;
  height: number;
  width: number;
  textSize: number;
  font: string;
  fontColor: string;
  margin: number;
  disabled?: boolean;
  paddingTop: number;
}

const CustomButton: React.FC<Props> = props => (
  <TouchableOpacity
    onPress={props.onClick}
    style={styles(props).appButtonContainer}>
    <Text style={styles(props).appButtonText}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = (props: Props) =>
  StyleSheet.create({
    // ...
    appButtonContainer: {
      elevation: 0,
      backgroundColor: props.color,
      borderRadius: props.radius,
      paddingVertical: props.paddingTop,
      paddingHorizontal: 0,
      alignItems: 'center',
      height: props.height,
      width: props.width,
      alignSelf: 'center',
      margin: props.margin,
    },
    appButtonText: {
      fontSize: props.textSize,
      fontFamily: props.font,
      fontStyle: 'normal',
      color: props.fontColor,
      //alignContent: 'center',
    },
  });

export default CustomButton;
