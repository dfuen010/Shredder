import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UsersDB');

const Weight = ({route, navigation}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [displayWeight, setDWeight] = useState('');
  const [date, setDate] = useState('');
  const [dateO, setDateO] = useState(new Date());
  const [month, setMonth] = useState((dateO.getMonth() + 1).toString);
  const [day, setDay] = useState(dateO.getDate().toString);
  const [year, setYear] = useState(dateO.getFullYear().toString);
  const [weightArr, setWeightArr] = useState('');
  const [bmiArr, setBmiArr] = useState('');

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM Users WHERE ID=' + route.params.id,
          null,
          (_, {rows}) => saveData(rows._array[0]),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const saveData = data => {
    setDWeight(JSON.stringify(data.Weight));
    setHeight(JSON.stringify(data.HeightFt * 12 + data.HeightIn));
    setWeightArr(JSON.stringify(data.WeightList));
    setBmiArr(JSON.stringify(data.BMIList));
  };
  const writeDate = () => {
    setDateO(new Date(year + '-' + month + '-' + day));
    setDate(dateO.toISOString());
  };
  const updateWeight = () => {
    try {
      writeDate();
      setWeightArr(weightArr + ', ' + weight + ' [' + date + ']');
      setBmiArr(
        bmiArr +
          ', ' +
          1 + //(parseInt(weight) / parseInt(height)) * 703 +
          ' [' +
          date +
          ']',
      );
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'UPDATE Users SET Weight=' +
            weight +
            "WeightList= '" +
            weightArr +
            "BMIList= '" +
            bmiArr +
            "' Where ID= '" +
            route.params.id +
            "'",
          null,
          (_, {}) => navigation.push('Homepage', {id: route.params.id}),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Add Weight</Text>
      <Text style={styles.text}> Weight(lbs):</Text>
      <CustomInput
        value={weight}
        setValue={setWeight}
        placeholder={displayWeight} //should be what current weight is
        height={41}
        width={82}
        radius={15}
        margin={10}
        keyboardType={'numeric'}
        color={'#8F8F8F'}
        align={'flex-end'}
      />
      <Text style={styles.text}> Date:</Text>
      <View style={styles.row}>
        <CustomInput
          value={month}
          setValue={setMonth}
          placeholder={displayWeight}
          height={41}
          width={82}
          radius={15}
          margin={10}
          keyboardType={'numeric'}
          color={'#8F8F8F'}
          align={'flex-end'}
        />
        <CustomInput
          value={day}
          setValue={setDay}
          placeholder={displayWeight}
          height={41}
          width={82}
          radius={15}
          margin={10}
          keyboardType={'numeric'}
          color={'#8F8F8F'}
          align={'flex-end'}
        />
        <CustomInput
          value={year}
          setValue={setYear}
          placeholder={displayWeight}
          height={41}
          width={82}
          radius={15}
          margin={10}
          keyboardType={'numeric'}
          color={'#8F8F8F'}
          align={'flex-end'}
        />
      </View>
      {/*<CustomInput*/}
      {/*  value={date}*/}
      {/*  setValue={setDate}*/}
      {/*  placeholder={*/}
      {/*    date.getDate() +*/}
      {/*    '/' +*/}
      {/*    (date.getMonth() + 1) +*/}
      {/*    '/' +*/}
      {/*    date.getFullYear()*/}
      {/*  } //should be what current date is*/}
      {/*  height={41}*/}
      {/*  width={111}*/}
      {/*  radius={15}*/}
      {/*  margin={10}*/}
      {/*  keyboardType={'numeric'}*/}
      {/*  color={'#8F8F8F'}*/}
      {/*  align={'flex-end'}*/}
      {/*/>*/}
      <CustomButton
        title={'Enter'}
        onClick={() => console.log('im working')}
        color={'#FE0000'}
        radius={15}
        height={32}
        width={98}
        textSize={17}
        font={'Inter'}
        fontColor={'#ffffff'}
        margin={40}
        paddingTop={3} //12
      />
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
export default Weight;
