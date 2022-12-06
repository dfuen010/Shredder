// import {useEffect, useState} from 'react';
// import Slider from '../../shared/Options';
// import EditExercise from './EditExercise';
// import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
// import {EXCERCISES, CARDIO_DEFAULTS, STRENGTH_DEFAULTS} from './defaults';
// import * as SQLite from 'expo-sqlite';
// const db = SQLite.openDatabase('ShredderDB');
//
// type ExerciseListProps = {
//   type: string;
// };
//
// const ExerciseList = ({type}: ExerciseListProps) => {
//   const defaults = type === 'Cardio' ? CARDIO_DEFAULTS : STRENGTH_DEFAULTS;
//   // make api call for created exercises here
//   return (
//     <>
//       {defaults.map((exercise, i) => {
//         return (
//           <>
//             <View style={styles.lineBreak} />
//             <EditExercise
//               exerciseType={type}
//               exerciseName={exercise}
//               isCreate={i === defaults.length - 1}
//             />
//           </>
//         );
//       })}
//     </>
//   );
// };
//
// const Exercises = () => {
//   const [exercise, setExercise] = useState('Cardio');
//
//   useEffect(() => {
//     createTable();
//   }, []);
//
//   const createTable = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS ' +
//           'Exercises ' +
//           '(ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
//           'Name TEXT, ' +
//           'Sets INTEGER, ' +
//           'Repetitions INTEGER, ' +
//           'WeightPS INTEGER ,' +
//           'Time INTEGER)',
//       );
//     });
//   };
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <Text style={styles.topText}>Add/Edit Exercise</Text>
//         <Slider options={EXCERCISES} setOption={setExercise} />
//         <ExerciseList type={exercise} />
//         <View style={styles.lineBreak} />
//       </View>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'black',
//     height: '100%',
//     width: '100%',
//   },
//   topText: {
//     color: 'white',
//     fontSize: 32,
//     textAlign: 'center',
//     padding: 25,
//   },
//   lineBreak: {
//     height: 3,
//     backgroundColor: 'red',
//   },
// });
//
// export default Exercises;
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import EditExercise from "./EditExercise";
import {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

const ExerciseList = ({route, navigation}) => {
  const exercise = ['Add Exercise'];
  return (
    <>
      {exercise.map((ex, i) => {
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
