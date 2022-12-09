import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import {LinearGradient} from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

// @ts-ignore
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const readData = async (func: Function) => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE Email LIKE '" + email + "'",
          undefined,
          (_, {rows}) => func(rows),
          () => {
            return navigation.push('CreateAccount', {
              userEmail: email,
              userPass: password,
            });
          },
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const handleLogin = () => {
    readData(logVal);
    console.log('User does not exist');
  };

  const logVal = (data: SQLite.SQLResultSetRowList) => {
    if (data._array[0].Password === password) {
      navigation.push('Homepage', {id: data._array[0].ID});
    } else {
      //should be displayed at somepoint
      console.log('Password Incorrect');
    }
  };
  const checkNewUser = (data: SQLite.SQLResultSetRowList) => {
    if (data.length === 0) {
      navigation.push('CreateAccount', {
        userEmail: email,
        userPass: password,
      });
    } else {
      console.log('User Already Exist');
    }
  };
  const handleCreateAccount = () => {
    readData(checkNewUser);
  };
  return (
    <LinearGradient
      colors={['#FF0000', '#000000']}
      style={styles.background}
      locations={[0, 0.8]}>
      <View>
        <StatusBar barStyle="dark-content" backgroundColor={'#FF0000'} />
        <DisplayAnImage />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={'Email Address'}
          height={30}
          width={200}
          radius={5}
          margin={10}
          keyboardType={'default'}
          color={'black'}
          align={'center'}
        />

        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder={'Password'}
          height={30}
          width={200}
          radius={5}
          margin={10}
          keyboardType={'default'}
          color={'black'}
          align={'center'}
        />
      </View>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flexDirection: 'row'}}>
        <CustomButton
          title={'Login'}
          onClick={() => handleLogin()} //navigation.navigate('AddWeight')}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Arial'}
          fontColor={'#ffffff'}
          margin={30}
          paddingTop={12}
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
  },
});

export default SignInScreen;
