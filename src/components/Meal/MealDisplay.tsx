import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

const MealDisplay = ({mealData}) => {
  const [mName, setMName] = useState('test1');
  const [mType, setType] = useState('test2');
  const [mCal, setMCal] = useState('test3');
  console.log(mealData);
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
