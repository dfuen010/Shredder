import React, {useState} from 'react';
import {View, Text, Image, ViewStyle} from 'react-native';
import CustomInput from '../Components/CustomInput';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text>Shredder</Text>

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
    </View>
  );
};

export default SignInScreen;
