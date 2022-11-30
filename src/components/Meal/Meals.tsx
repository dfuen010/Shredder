import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import EditMeal from './EditMeal';

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
