import React, {useState} from 'react';
import {View, Text, Image, ViewStyle, StyleSheet, Button, Alert, SectionList} from 'react-native';
import CustomInput from '../../shared/CustomInput';
import CustomButton from '../../shared/CustomButton';
import DisplayAnImage from '../../shared/DisplayAnImage';
import { StackParamList } from '../../shared/Screens';
import { NavigationProp } from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';
import ToggleSwitch from '../../shared/ToggleSwitch';



const homepage = () => { 

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
  
              <Text>
                PROGRESS
              </Text>

              <Button
                title="Logout"
                onPress={() => Alert.alert('User has log out')}
              />
      </View>

      <View style={styles.fixToText}>
      <View>
      <Text style = {{ fontWeight : "bold"}}>Weight</Text>
      <Text>194 lbs</Text>
      </View>

      <Image
            style={styles.logo}
            source={require('../../../Shared/Images/Profile.png')}
          />

      <View>
      <Text style = {{ fontWeight : "bold"}}>Height</Text>
      <Text>5'11"</Text>
      </View>

      </View>

      <View style={styles.fixToText}>
        <Text></Text>
      <Text style = {{ fontWeight : "bold"}}> Jeff Goldman</Text>
      <Text></Text>
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
    topBarButtons:{ 
      height: 30,
      width: 30
    },
    fixToText: { 
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    profileName: { 
      alignItems: 'center'
    }

  });
  
export default homepage;