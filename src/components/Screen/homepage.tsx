import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  useWindowDimensions,
} from 'react-native';
import CustomButton from '../../shared/CustomButton';
import {LinearGradient} from 'expo-linear-gradient';
import {TabView, SceneMap} from 'react-native-tab-view';
import MealDisplay from '../Meal/MealDisplay';
import * as SQLite from 'expo-sqlite';
import ExerciseDisplay from "../Exercise/ExerciseDisplay";
const db = SQLite.openDatabase('ShredderDB');

const Homepage = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setFt] = useState('');
  const [heightIn, setIn] = useState('');
  const [mealList, setMealList] = useState([]);
  const [exList, setExList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      console.log('test');
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
  const setList = lis => {
    if (lis.length === 1 && lis[0] == '""') {
      return;
    }
    lis.map(meal => {
      meal = meal.replace(/"/g, '');
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Meals WHERE Name LIKE '" + meal + "'",
          null,
          (_, {rows}) => mealList.push(rows._array[0]),
        );
      });
    });
  };
  const setexList = lis => {
    console.log('chek', lis);
    if (lis.length === 1 && lis[0] == '""') {
      return;
    }
    lis.map(ex => {
      ex = ex.replace(/"/g, '');
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Exercises WHERE Name LIKE '" + ex + "'",
          null,
          (_, {rows}) => exList.push(rows._array[0]),
        );
      });
    });
  };
  const saveData = async data => {
    await setName(data.Name);
    await setWeight(data.Weight);
    await setFt(data.HeightFt);
    await setIn(data.HeightIn);
    await setList(JSON.stringify(data.Meals).split(', '));
    await setexList(JSON.stringify(data.Exercises).split(', '));
  };
  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {mealList.map(meal => (
        <View key={meal}>
          <View style={styles.lineBreak} />
          <MealDisplay mealData={meal} />
        </View>
      ))}
      <View style={styles.lineBreak} />
      <Text style={styles.textTotal}>Total Calories:</Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {exList.map(ex => (
        <View key={ex}>
          <View style={styles.lineBreak} />
          <ExerciseDisplay exData={ex} />
        </View>
      ))}
      <View style={styles.lineBreak} />
      <Text style={styles.textTotal}>Total Calories:</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Meals'},
    {key: 'second', title: 'Exercises'},
  ]);
  console.log(mealList);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#FFFFFF']}
        style={styles.background}
        locations={[0, 0.8]}>
        <View style={styles.fixToText}>
          <Button
            title="Progress"
            onPress={() => Alert.alert('Displaying User Progress')}
          />
          <Text style={styles.text}>Profile</Text>

          <Button title="Logout" onPress={() => navigation.push('Login')} />
        </View>

        <View style={styles.fixToText}>
          <View>
            <Button
              title={'Weight'}
              onPress={() =>
                navigation.push('AddWeight', {id: route.params.id})
              }
            />
            <Text style={styles.text}>{weight} lbs</Text>
          </View>

          <Image
            style={styles.logo}
            source={require('../../../Shared/Images/blankprofile.png')}
          />

          <View>
            <Button
              title={'Height'}
              onPress={() =>
                navigation.push('AddHeight', {id: route.params.id})
              }
            />
            <Text style={styles.text}>
              {heightFt}'{heightIn}"
            </Text>
          </View>
        </View>

        <View style={styles.fixToText}>
          <Text />
          <Text style={{fontWeight: 'bold', color: '#ffffff'}}> {name} </Text>
          <Text />
        </View>
        <View style={styles.fixToTextBut}>
          <CustomButton
            title={'Add Meal'}
            onClick={() =>
              navigation.navigate('ViewMeals', {id: route.params.id})
            }
            color={'black'}
            radius={20}
            height={30}
            width={100}
            textSize={15}
            font={'Arial'}
            fontColor={'#ffffff'}
            margin={0}
            paddingTop={5}
          />
          <CustomButton
            title={'Workouts'}
            onClick={() =>
              navigation.navigate('ViewExercise', {id: route.params.id})
            }
            color={'black'}
            radius={20}
            height={30}
            width={100}
            textSize={15}
            font={'Arial'}
            fontColor={'#ffffff'}
            margin={10}
            paddingTop={5}
          />
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    marginTop: 50,
  },
  textTotal: {
    fontWeight: '700',
    fontSize: 18,
    color: '#ffffffff',
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
    marginTop: 40,
  },
  topBarButtons: {
    height: 30,
    width: 30,
  },
  fixToText: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fixToTextBut: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileName: {
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  lineBreak: {
    height: 3,
    backgroundColor: 'red',
  },
});

export default Homepage;
