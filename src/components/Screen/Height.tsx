import React, {useState} from 'react';
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

const Height = () => {
  const [ft, setFt] = useState('');
  const [inch, setIn] = useState('');
  const [date, setDate] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Add Height</Text>
      <Text style={styles.text}> Height(ft):</Text>
      <CustomInput
        value={ft}
        setValue={setFt}
        placeholder={'5'} //should be what current weight is
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
        placeholder={'10'} //should be what current weight is
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
        placeholder={'11/15/2022'} //should be what current weight is
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
        onClick={() => console.log('im working')}
        color={'#FE0000'}
        radius={15}
        height={32}
        width={98}
        textSize={17}
        font={'Inter'}
        fontColor={'#ffffff'}
        margin={40}
        paddingTop={3} //12
      />
    </View>
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
    fontFamily: 'Inter',
    color: '#ffffff',
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 30,
  },
  text: {
    color: '#ffffff',
    alignSelf: 'baseline',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 24,
  },
});
export default Height;