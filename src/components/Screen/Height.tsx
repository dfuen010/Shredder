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
const Height = ({route, navigation}) => {
  const [ft, setFt] = useState('');
  const [inch, setIn] = useState('');
  const [date, setDate] = useState('');
  const [displayHeightIn, setDHeightIn] = useState('');
  const [displayHeightFt, setDHeightFt] = useState('');
  const [heightList, setHeightList] = useState('');
  const today = new Date();
  const tempDate =
    today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM Users WHERE ID=' + route.params.id,
          undefined,
          (_, {rows}) => setHeights(rows),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const setHeights = async (data: SQLite.SQLResultSetRowList) => {
    setDHeightFt(JSON.stringify(data._array[0].HeightFt));
    setDHeightIn(JSON.stringify(data._array[0].HeightIn));
    setHeightList(JSON.stringify(data._array[0].HeightList));
  };

  const updateHeight = () => {
    try {
      let temp = '';
      if (heightList === '""') {
        temp = parseInt(ft, 10) * 12 + parseInt(inch, 10) + ' [' + date + ']';
      } else {
        temp =
          heightList +
          ', ' +
          parseInt(ft, 10) * 12 +
          parseInt(inch, 10) +
          ' [' +
          date +
          ']';
        temp = temp.replace(/"/g, '');
      }
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "UPDATE Users SET HeightList='" +
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
          'UPDATE Users SET HeightFt=' +
            ft +
            ', HeightIn=' +
            inch +
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

  useEffect(() => {
    readData();
  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Homepage', {id: route.params.id})}
        />
        <Text style={styles.header}>Add Height</Text>
        <Text style={styles.text}> Height(ft):</Text>
        <CustomInput
          value={ft}
          setValue={setFt}
          placeholder={displayHeightFt} //should be what current weight is
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
          placeholder={displayHeightIn} //should be what current weight is
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
          placeholder={tempDate}
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
          onClick={() => updateHeight()}
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
export default Height;
