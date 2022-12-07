import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

// @ts-ignore
const CreateAccount = ({route, navigation}) => {
  const {userEmail, userPass} = route.params;
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setFt] = useState('');
  const [heightIn, setIn] = useState('');
  const today = new Date();
  const tempDate =
    today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'Name TEXT, ' +
          'Email TEXT, ' +
          'Password TEXT, ' +
          'Weight INTEGER, ' +
          'HeightFt INTEGER, ' +
          'HeightIn INTEGER, ' +
          'Exercises BLOB, ' +
          'Meals BLOB, ' +
          'WeightList BLOB, ' +
          'HeightList BLOB, ' +
          'BMIList BLOB)',
      );
    });
  };
  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE Email LIKE '" + userEmail + "'",
          undefined,
          (_, {rows}) => navigation.push('Homepage', {id: rows._array[0].ID}),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const writeData = async () => {
    try {
      db.transaction(async tx => {
        tx.executeSql(
          'INSERT INTO Users (Name, Email, Password, Weight, HeightFt, HeightIn, Exercises, Meals, WeightList, HeightList, BMIList) Values (?,?,?,?,?,?,?,?,?,?,?)',
          [
            name,
            userEmail,
            userPass,
            weight,
            heightFt,
            heightIn,
            '',
            '',
            weight + ' [' + tempDate + ']',
            parseInt(heightFt, 10) * 12 +
              parseInt(heightIn, 10) +
              ' [' +
              tempDate +
              ']',
            '',
          ],
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  //stores data in database
  const handleCreateAccount = async () => {
    await writeData();
    await readData();
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF0000', '#000000']}
        style={styles.background}
        locations={[0, 0.8]}>
        <View style={styles.textInputBox}>
          <Image
            style={styles.logo}
            source={require('../../../Shared/Images/My_project.png')}
          />
          <CustomInput
            value={name}
            setValue={setName}
            placeholder={'Name'}
            height={31}
            width={251}
            radius={0}
            margin={25}
            keyboardType={'default'}
            color={'black'}
            align={'center'}
          />

          <CustomInput
            value={weight}
            setValue={setWeight}
            placeholder={'Weight (lbs)'}
            height={31}
            width={251}
            radius={0}
            margin={25}
            keyboardType={'number-pad'}
            color={'black'}
            align={'center'}
          />

          <CustomInput
            value={heightFt}
            setValue={setFt}
            placeholder={'Height (ft)'}
            height={31}
            width={251}
            radius={0}
            margin={25}
            keyboardType={'number-pad'}
            color={'black'}
            align={'center'}
          />

          <CustomInput
            value={heightIn}
            setValue={setIn}
            placeholder={'Height (in)'}
            height={31}
            width={251}
            radius={0}
            margin={25}
            keyboardType={'number-pad'}
            color={'black'}
            align={'center'}
          />
          <CustomButton
            title={'Create Account'}
            onClick={() => handleCreateAccount()}
            color={'#CB3F3F'}
            radius={20}
            height={47}
            width={133}
            textSize={15}
            font={'Arial'}
            fontColor={'#ffffff'}
            margin={40}
            paddingTop={12}
          />
        </View>
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
});

export default CreateAccount;
