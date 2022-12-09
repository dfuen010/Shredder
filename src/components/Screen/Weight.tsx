import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Button,
} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ShredderDB');

// @ts-ignore
const Weight = ({route, navigation}) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [displayWeight, setDWeight] = useState('');
  const [weightList, setWeightList] = useState('');
  const today = new Date();
  const tempDate =
    today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE ID= '" + route.params.id + "'",
          undefined,
          (_, {rows}) => {
            setDWeight(JSON.stringify(rows._array[0].Weight));
            setWeightList(JSON.stringify(rows._array[0].WeightList));
          },
        );
      });
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    readData();
  });

  const updateWeight = () => {
    try {
      let temp = '';
      if (weightList === '""') {
        temp = weight + ' [' + date + ']';
      } else {
        temp = weightList + ', ' + weight + ' [' + date + ']';
        temp = temp.replace(/"/g, '');
      }
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "UPDATE Users SET WeightList='" +
            temp +
            "' Where ID= '" +
            route.params.id +
            "'",
          undefined,
        );
      });
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'UPDATE Users SET Weight=' +
            weight +
            " Where ID= '" +
            route.params.id +
            "'",
          undefined,
          (_, {}) => navigation.push('Homepage', {id: route.params.id}),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Homepage', {id: route.params.id})}
        />
        <Text style={styles.header}>Add Weight</Text>
        <Text style={styles.text}> Weight(lbs):</Text>
        <CustomInput
          value={weight}
          setValue={setWeight}
          placeholder={displayWeight}
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
          placeholder={tempDate} //should be what current date is
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
          onClick={() => updateWeight()}
          color={'#FE0000'}
          radius={15}
          height={32}
          width={98}
          textSize={17}
          font={'Arial'}
          fontColor={'#ffffff'}
          margin={40}
          paddingTop={3} //12
        />
      </View>
    </SafeAreaView>
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
  fixToText: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    fontFamily: 'Arial',
    fontWeight: '600',
    lineHeight: 24,
  },
});
export default Weight;
