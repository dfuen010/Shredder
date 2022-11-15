import React, {useState} from 'react';
import {View, Text, Image, ViewStyle, StyleSheet} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import { StackParamList } from '../../shared/Screens';
import { NavigationProp } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {
  navigation: NavigationProp<StackParamList, 'CreateAccount'>;
}

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
    <LinearGradient
        colors={['#FF0000', '#000000']}
        style={styles.background}
        locations={[0, 0.8]}>
    <View style={styles.container}>
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
          onClick={() => console.log('yeas')}
          color={'#CB3F3F'}
          radius={20}
          height={47}
          width={133}
          textSize={15}
          font={'Roboto'}
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
          font={'Roboto'}
          fontColor={'#ffffff'}
          margin={40} />
    </View>
    </LinearGradient>
    </>
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
