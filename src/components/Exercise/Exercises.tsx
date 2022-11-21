import {useState} from 'react';
import Slider from '../../shared/Options';
import EditExercise from './EditExercise';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {EXCERCISES, CARDIO_DEFAULTS, STRENGTH_DEFAULTS} from './defaults';

type ExerciseListProps = {
  type: string;
};

const ExerciseList = ({type}: ExerciseListProps) => {
  const defaults = type === 'Cardio' ? CARDIO_DEFAULTS : STRENGTH_DEFAULTS;
  // make api call for created exercises here
  return (
    <>
      {defaults.map((exercise, i) => {
        return (
          <>
            <View style={styles.lineBreak} />
            <EditExercise
              exerciseType={type}
              exerciseName={exercise}
              isCreate={i === defaults.length - 1}
            />
          </>
        );
      })}
    </>
  );
};

const Exercises = () => {
  const [exercise, setExercise] = useState('Cardio');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.topText}>Add/Edit Exercise</Text>
        <Slider options={EXCERCISES} setOption={setExercise} />
        <ExerciseList type={exercise} />
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
