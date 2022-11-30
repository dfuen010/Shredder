import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UsersDB');
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

const Progress = ({route, navigation}) => {
  const [weightList, setWeightList] = useState([0]);
  const [bmiList, setBMIList] = useState([0]);
  const [weightDateList, setDateWeightList] = useState(['']);
  const [bmiDateList, setDateBMIList] = useState(['']);

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE ID= '" + route.params.id + "'",
          null,
          (_, {rows}) => saveData(rows._array[0]),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const saveData = data => {
    let temp = JSON.stringify(data.WeightList);
    let lis = [];
    let dlis = [];
    while (true) {
      const ind = temp.indexOf(']');
      if (ind == -1) {
        break;
      } else {
        const str = temp.substring(0, ind);
        lis.push(parseInt(str.substring(0, str.indexOf(' '))));
        dlis.push(new Date(str.substring(str.indexOf('[') + 1)).toDateString());
      }
    }
    setWeightList(lis);
    setDateBMIList(dlis);
    temp = JSON.stringify(data.BMIList);
    lis = [];
    dlis = [];
    while (true) {
      const ind = temp.indexOf(']');
      if (ind == -1) {
        break;
      } else {
        const str = temp.substring(0, ind);
        lis.push(parseInt(str.substring(0, str.indexOf(' '))));
        dlis.push(new Date(str.substring(str.indexOf('[') + 1)).toDateString());
      }
    }
    setBMIList(lis);
    setDateBMIList(dlis);
  };
  const data = {
    labels: weightDateList,
    datasets: [
      {
        data: weightList,
        //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        //strokeWidth: 2, // optional
      },
    ],
    //legend: ['Rainy Days'], // optional
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Progress</Text>
      <LineChart data={data} height={220} width={screenWidth} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingTop: 0,
  },
  textInputBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginBottom: 40,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Arial',
    color: '#ffffff',
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 30,
  },
  text: {
    color: '#ffffff',
    alignSelf: 'baseline',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 24,
  },
});
