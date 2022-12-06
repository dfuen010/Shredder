import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

const ExerciseDisplay = ({exData}) => {
  console.log(exData);
  return (
    <View>
      <View style={styles.fixToText}>
        <Text style={styles.text}>{exData.Name}</Text>
        <Text style={styles.text}>{exData.Time} Mins</Text>
      </View>
      <View>
        <Text style={styles.subtext}>&emsp;{exData.Sets}x{exData.Repetitions}x{exData.WeightPS}</Text>
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

export default ExerciseDisplay;
