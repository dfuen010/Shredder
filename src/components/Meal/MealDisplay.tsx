import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// @ts-ignore
const MealDisplay = ({mealData}) => {
  return (
    <View>
      <View style={styles.fixToText}>
        <Text style={styles.text}>{mealData.MealType}</Text>
        <Text style={styles.text}>{mealData.Calories} Calories</Text>
      </View>
      <View>
        <Text style={styles.subtext}>&emsp;{mealData.Name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffffff',
  },
  subtext: {
    fontSize: 14,
    color: '#ffffffff',
  },
});

export default MealDisplay;
