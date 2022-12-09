import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Button,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

// @ts-ignore
const Progress = ({route, navigation}) => {
  const [weightList, setWeightList] = useState([0]);
  const [heightList, setHeightList] = useState([0]);
  const [weightDateList, setDateWeightList] = useState(['']);
  const [heightDateList, setDateHeightList] = useState(['']);

  useEffect(() => {
    readData();
  });

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE ID= '" + route.params.id + "'",
          undefined,
          (_, {rows}) => saveData(rows._array[0]),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const saveData = (data: {WeightList: any; HeightList: any}) => {
    let temp = JSON.stringify(data.WeightList);
    temp = temp.replace(/"/g, '');
    let lis = temp.split(', ');
    weightList.pop();
    weightDateList.pop();
    let lis1: number[] = [];
    let lis2: string[] = [];
    lis.forEach(item => {
      lis1.push(parseInt(item.substring(0, item.indexOf(' ')), 10));
      lis2.push(item.substring(item.indexOf('[') + 1, item.indexOf(']')));
    });
    setWeightList(lis1);
    setDateWeightList(lis2);

    temp = JSON.stringify(data.HeightList);
    temp = temp.replace(/"/g, '');
    lis = temp.split(', ');
    heightList.pop();
    heightDateList.pop();
    lis1 = [];
    lis2 = [];
    lis.forEach(item => {
      lis1.push(parseInt(item.substring(0, item.indexOf(' ')), 10));
      lis2.push(item.substring(item.indexOf('[') + 1, item.indexOf(']')));
    });
    setHeightList(lis1);
    setDateHeightList(lis2);
  };
  const dataW = {
    labels: weightDateList,
    datasets: [
      {
        data: weightList,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
      },
    ],
  };
  const dataH = {
    labels: heightDateList,
    datasets: [
      {
        data: heightList,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#000000',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ff0000',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.fixToText}>
          <Button
            title="Profile"
            onPress={() =>
              navigation.navigate('Homepage', {id: route.params.id})
            }
          />
          <Text style={styles.text}>Progress</Text>

          <Button title="Logout" onPress={() => navigation.push('Login')} />
        </View>
        <Text style={styles.label}>Weight in Lbs</Text>
        <LineChart
          data={dataW}
          height={220}
          width={screenWidth}
          chartConfig={chartConfig}
        />
        <Text style={styles.label}>Height in Inches</Text>
        <LineChart
          data={dataH}
          height={220}
          width={screenWidth}
          chartConfig={chartConfig}
        />
      </SafeAreaView>
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
  fixToText: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingTop: 0,
  },
  label: {
    color: '#ffffff',
    alignSelf: 'baseline',
    margin: 10,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '600',
    lineHeight: 24,
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
    fontFamily: 'Arial',
    color: '#ffffff',
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 30,
  },
  text: {
    color: '#ffffff',
    alignSelf: 'baseline',
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '600',
    lineHeight: 24,
  },
});
export default Progress;
