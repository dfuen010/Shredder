import {View, Text, StyleSheet, SafeAreaView, Button, Pressable} from 'react-native';

type Props = {
  options: string[],
  setOption: (value: string) => void
};

const Options = ({options, setOption }: Props) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        return (
          <View>
            <Pressable key={option} onPress={() => setOption(option)}></Pressable>
            <Text>{option}</Text>
          </View>
        );
      })} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(53, 53, 53, 0.5)",
    height: 86,
    width: 344,
    borderRadius: 50,
    opacity: 0.75,
    
  },
  optionText: {
    color: "white",
  },
});

export default Options;