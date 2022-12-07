import {SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';
import EditExercise from './EditExercise';
import React, {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

// @ts-ignore
const ExerciseList = ({route, navigation}) => {
  const exercise = ['Add Exercise'];
  return (
    <>
      {exercise.map(() => {
        return (
          <>
            <View style={styles.lineBreak} />
            <EditExercise route={route} navigation={navigation} />
          </>
        );
      })}
    </>
  );
};

// @ts-ignore
const Exercises = ({route, navigation}) => {
  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Exercises ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'Name TEXT, ' +
          'Sets INTEGER, ' +
          'Repetitions INTEGER, ' +
          'WeightPS INTEGER ,' +
          'Time INTEGER)',
      );
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
            title="Profile"
            onPress={() => navigation.navigate('Homepage', {id: route.params.id})}
        />
        <Text style={styles.topText}>Add/Edit Exercise</Text>
        <ExerciseList route={route} navigation={navigation} />
        <View style={styles.lineBreak} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
  topText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    padding: 25,
  },
  lineBreak: {
    height: 3,
    backgroundColor: 'red',
  },
});

export default Exercises;
