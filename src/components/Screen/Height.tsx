import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('UsersDB');

const Height = ({route, navigation}) => {
  const [weight, setWeight] = useState('');
  const [ft, setFt] = useState('');
  const [inch, setIn] = useState('');
  const [date, setDate] = useState('');
  const [displayHeightIn, setDHeightIn] = useState('');
  const [displayHeightFt, setDHeightFt] = useState('');
  const [dateO, setDateO] = useState(new Date());
  const [month, setMonth] = useState((dateO.getMonth() + 1).toString);
  const [day, setDay] = useState(dateO.getDate().toString);
  const [year, setYear] = useState(dateO.getFullYear().toString);
  const [heightArr, setHeightArr] = useState('');
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
    setWeight(JSON.stringify(data.Weight));
    setDHeightFt(JSON.stringify(data.HeightFt));
    setDHeightIn(JSON.stringify(data.HeightIn));
    setHeightArr(JSON.stringify(data.HeightList));
    setBmiArr(JSON.stringify(data.BMIList));
  };

  const writeDate = () => {
    setDateO(new Date(year + '-' + month + '-' + day));
    setDate(dateO.toISOString());
  };
  const updateHeight = async () => {
    try {
      writeDate();
      setHeightArr(heightArr + ', ' + ft + ' ' + inch + ' [' + date + ']');
      setBmiArr(
        bmiArr +
          ', ' +
          (parseInt(weight) / (parseInt(ft) * 12 + parseInt(inch))) * 703 +
          ' [' +
          date +
          ']',
      );
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'UPDATE Users SET HeightFt=' +
            ft +
            ', HeightIn=' +
            inch +
            ", HeightList= '" +
            heightArr +
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
      <Text style={styles.header}>Add Height</Text>
      <Text style={styles.text}> Height(ft):</Text>
      <CustomInput
        value={ft}
        setValue={setFt}
        placeholder={displayHeightIn} //should be what current weight is
        height={41}
        width={82}
        radius={15}
        margin={10}
        keyboardType={'numeric'}
        color={'#8F8F8F'}
        align={'flex-end'}
      />
      <Text style={styles.text}> Height(in):</Text>
      <CustomInput
        value={inch}
        setValue={setIn}
        placeholder={'10'} //should be what current weight is
        height={41}
        width={82}
        radius={15}
        margin={10}
        keyboardType={'numeric'}
        color={'#8F8F8F'}
        align={'flex-end'}
      />
      <Text style={styles.text}> Date:</Text>
      <CustomInput
        value={date}
        setValue={setDate}
        placeholder={'11/15/2022'} //should be what current weight is
        height={41}
        width={111}
        radius={15}
        margin={10}
        keyboardType={'numeric'}
        color={'#8F8F8F'}
        align={'flex-end'}
      />
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
export default Height;
