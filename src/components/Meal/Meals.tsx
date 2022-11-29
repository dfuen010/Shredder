import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import EditMeal from './EditMeal';
import {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UsersDB');

const MealList = () => {
  const meals = ['Add Meal'];
  return (
    <>
      {meals.map((meal, i) => {
        return (
          <>
            <View style={styles.lineBreak} />
            <EditMeal isCreate={i === meals.length - 1} mealName={meal} />
          </>
        );
      })}
    </>
  );
};

const Meals = () => {
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
        <Text style={styles.topText}>Add/Edit Meal</Text>
        <MealList />
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
