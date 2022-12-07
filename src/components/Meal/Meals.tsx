import {SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';
import EditMeal from './EditMeal';
import React, {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

// @ts-ignore
const MealList = ({route, navigation}) => {
  const meals = ['Add Meal'];
  return (
    <>
      {meals.map(() => {
        return (
          <>
            <View style={styles.lineBreak} />
            <EditMeal route={route} navigation={navigation} />
          </>
        );
      })}
    </>
  );
};

// @ts-ignore
const Meals = ({route, navigation}) => {
  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Meals ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'Name TEXT, ' +
          'MealType TEXT, ' +
          'Calories INTEGER, ' +
          'Protein INTEGER ,' +
          'Carbs INTEGER ,' +
          'Fat INTEGER)',
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
        <Text style={styles.topText}>Add/Edit Meal</Text>
        <MealList route={route} navigation={navigation} />

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

export default Meals;
