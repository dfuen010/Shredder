import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  StyleSheet,
  Button,
  Alert,
  SectionList,
} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import {StackParamList} from '../../shared/Screens';
import {NavigationProp} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import ToggleSwitch from '../../shared/ToggleSwitch';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UsersDB');

const Homepage = ({route, navigation}) => {
  const {id} = route.params.id;
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setFt] = useState('');
  const [heightIn, setIn] = useState('');

  useEffect(() => {
    readData();
  });

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE ID= '" + route.params.id + "'",
          null,
          (_, {rows}) => saveData(rows._array[0]),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const saveData = async data => {
    await setName(data.Name);
    await setWeight(data.Weight);
    await setFt(data.HeightFt);
    await setIn(data.HeightIn);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={styles.background}
        locations={[0, 0.8]}>
        <View style={styles.fixToText}>
          <Button
            title="Profile"
            onPress={() => Alert.alert('Displaying User Progress')}
          />

          <Text>PROGRESS</Text>

          <Button
            title="Logout"
            onPress={() => Alert.alert('User has log out')}
          />
        </View>

        <View style={styles.fixToText}>
          <View>
            <CustomButton
              title={'Weight'}
              onClick={() =>
                navigation.navigate('AddWeight', {id: route.params.id})
              }
              color={'black'}
              radius={20}
              height={30}
              width={60}
              textSize={15}
              font={'Arial'}
              fontColor={'#ffffff'}
              margin={0}
              paddingTop={5}
            />
            <Text>{weight} lbs</Text>
          </View>

          <Image
            style={styles.logo}
            source={require('../../../Shared/Images/blankprofile.png')}
          />

          <View>
            <CustomButton
              title={'Height'}
              onClick={() =>
                navigation.navigate('AddHeight', {id: route.params.id})
              }
              color={'black'}
              radius={20}
              height={30}
              width={60}
              textSize={15}
              font={'Arial'}
              fontColor={'#ffffff'}
              margin={0}
              paddingTop={5}
            />
            <Text>
              {heightFt}'{heightIn}"
            </Text>
          </View>
        </View>

        <View style={styles.fixToText}>
          <Text />
          <Text style={{fontWeight: 'bold'}}> {name} </Text>
          <Text />
        </View>

        {/* <View style={styles.fixToText}>
          <ToggleSwitch />
       </View> */}

        {/* <View style={styles.fixToText}>
        <Button
                title="Profile"
                onPress={() => Alert.alert('Displaying User Progress')}
              />
       </View> */}
        <CustomButton
          title={'Meals'}
          onClick={() =>
            navigation.navigate('ViewMeals', {id: route.params.id})
          }
          color={'black'}
          radius={20}
          height={30}
          width={100}
          textSize={15}
          font={'Arial'}
          fontColor={'#ffffff'}
          margin={0}
          paddingTop={5}
        />
        <CustomButton
          title={'Workouts'}
          onClick={() =>
            navigation.navigate('ViewExercise', {id: route.params.id})
          }
          color={'black'}
          radius={20}
          height={30}
          width={100}
          textSize={15}
          font={'Arial'}
          fontColor={'#ffffff'}
          margin={10}
          paddingTop={5}
        />
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
    marginTop: 40,
  },
  topBarButtons: {
    height: 30,
    width: 30,
  },
  fixToText: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profileName: {
    alignItems: 'center',
  },
});

export default Homepage;
