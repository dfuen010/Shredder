import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  StyleSheet,
  StatusBar,
} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import {LinearGradient} from 'expo-linear-gradient';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UsersDB');

//code needs a lot of clean up here
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dbData, setData] = useState({});
  const [canLogin, setCanLogin] = useState(false);
  const [canCreateAccount, setCanCreateAccount] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {}, []);

  const readData = async (func: Function) => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM Users WHERE Email=' + email,
          null,
          (_, {rows}) => func(rows),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const handleLogin = () => {
    readData(logVal);
    if (canLogin) {
      navigation.navigate('Homepage', {id: id})
    } else {
      console.log('User does not exist');
    }
  };

  const logVal = (data: SQLite.SQLResultSetRowList) => {
    if (data._array[0].Password === password) {
      setCanLogin(true);
      setId(data._array[0].ID);
    } else {
      console.log('Password Incorrect');
    }
  };
  const checkNewUser = (data: SQLite.SQLResultSetRowList) => {
    if (data.length === 0) {
      setCanCreateAccount(true);
    }
  };
  //not properly checking for accounts yet
  const handleCreateAccount = () => {
    //readData(checkNewUser);
    navigation.navigate('CreateAccount', {
      userEmail: email,
      userPass: password,
    });
    // if (canCreateAccount) {
    // } else {
    //   console.log('User Already Exist');
    // }
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
