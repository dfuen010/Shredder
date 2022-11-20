import React, {useState} from 'react';
import {View, Text, Image, ViewStyle, Alert} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import {User, useRealm, useQuery} from '../Realm/User';
import {StackParamList} from '../../shared/Screens';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<StackParamList, 'CreateAccount'>;
};

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const realm = useRealm();
  const result = useQuery('User');

  const handleUserLogin = React.useCallback(
    (email: string, password: string) => {
      if (email == '' || password == '') {
        console.log('working realm data');
        return;
      }

      try {
        realm.write(() => {
          //check for user
          const q = `email == '${email}'`;
          let userResults = realm.objects('User').filtered(q);

          if (!userResults.length) {
            let userResults = [
              realm.create('User', new User('Heyo', email, password)),
            ];
          }

          console.log(email);
          Alert.alert('success adding user');
        });
      } catch (e: any) {
        Alert.alert('error adding user', e.message);
      }
    },
    [realm],
  );

  return (
    <>
      <View>
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
        />
        <CustomButton
          title={'Login'}
          onClick={() => handleUserLogin}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Roboto'}
          fontColor={'#ffffff'}
          margin={40}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <CustomButton
          title={'Login'}
          onClick={() => console.log('yeas')}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Roboto'}
          fontColor={'#ffffff'}
          margin={40}
        />
        <CustomButton
          title={'Create Account'}
          onClick={() => navigation.navigate('CreateAccount')}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Roboto'}
          fontColor={'#ffffff'}
          margin={40}
        />
      </View>
    </>
  );
};

export default SignInScreen;
