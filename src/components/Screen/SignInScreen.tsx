import React, {useState} from 'react';
import {View, Text, Image, ViewStyle} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import { StackParamList } from '../../shared/Screens';
import { NavigationProp } from '@react-navigation/native'

// type Props = {
//   navigation: NavigationProp<StackParamList, 'CreateAccount'>;
// }

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        keyboardType={'default'} />

      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder={'Password'}
        height={30}
        width={200}
        radius={5}
        margin={10}
        keyboardType={'default'} />
    </View>
    <View style={{ flexDirection:"row" }}>
        <CustomButton
          title={'Login'}
          onClick={() => navigation.navigate('Homepage')}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Arial'}
          fontColor={'#ffffff'}
          margin={40} />
        <CustomButton
          title={'Create Account'}
          onClick={() => navigation.navigate('CreateAccount')}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Arial'}
          fontColor={'#ffffff'}
          margin={40} />
    </View>
    </>
  );
};

export default SignInScreen;
