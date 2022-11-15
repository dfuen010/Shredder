import React, {useState} from 'react';
import {View, Text, Image, ViewStyle, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setFt] = useState('');
  const [heightIn, setIn] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF0000', '#000000']}
        style={styles.background}
        locations={[0, 0.8]}>
        <View style={styles.textInputBox}>
          <DisplayAnImage />
          {/*<Image*/}
          {/*  style={styles.logo}*/}
          {/*  source={require('../Images/My_project.png')}*/}
          {/*/>*/}
          <CustomInput
            value={name}
            setValue={setName}
            placeholder={'Name'}
            height={31}
            width={75}
            radius={0}
            margin={25}
            keyboardType={'default'}
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
          />
          <CustomButton
            title={'Create Account'}
            onClick={() => console.log('im working')}
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
    marginTop: 40
  },
});

export default CreateAccount;
