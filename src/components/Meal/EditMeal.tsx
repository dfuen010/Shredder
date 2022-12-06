import {
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('ShredderDB');

const EditMeal = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [meal, setMeal] = useState('');
  const [name, setName] = useState('');
  const [calories, setCal] = useState('');
  const [protein, setPro] = useState('');
  const [carbs, setCarb] = useState('');
  const [fat, setFat] = useState('');
  const [mealList, setMealList] = useState('');

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          "SELECT * FROM Users WHERE ID= '" + route.params.id + "'",
          null,
          (_, {rows}) => setMealList(JSON.stringify(rows._array[0].Meals)),
        );
      });
    } catch (error) {
      console.log('error');
    }
  };
  const saveChanges = async () => {
    console.log('test');
    db.transaction(async tx => {
      tx.executeSql(
        'INSERT INTO Meals (Name, MealType, Calories, Protein, Carbs, Fat) Values (?,?,?,?,?,?)',
        [name, meal, calories, protein, carbs, fat],
        (_, {}) => console.log('check'),
      );
    });
    console.log(route.params.id);
    let temp = '';
    if (mealList == '""') {
      temp = name;
    } else {
      temp = mealList + ', ' + name;
      temp = temp.replace(/"/g, '');
    }
    console.log(temp);
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        "UPDATE Users SET Meals='" +
          temp +
          "' Where ID= '" +
          route.params.id +
          "'",
        null,
        (_, {}) => navigation.push('Homepage', {id: route.params.id}),
      );
      console.log('test');
    });
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Meal</Text>
            <View>
              <Text style={styles.paramText}>Meal:</Text>
              <TextInput onChangeText={setMeal} value={meal} />
            </View>
            <View>
              <Text style={styles.paramText}>Name:</Text>
              <TextInput onChangeText={setName} value={name} />
            </View>
            <View>
              <Text style={styles.paramText}>Calories:</Text>
              <TextInput onChangeText={setCal} value={calories} />
            </View>
            <View>
              <Text style={styles.paramText}>Protein (g):</Text>
              <TextInput onChangeText={setPro} value={protein} />
            </View>
            <View>
              <Text style={styles.paramText}>Carbohydrates (g):</Text>
              <TextInput onChangeText={setCarb} value={carbs} />
            </View>
            <View>
              <Text style={styles.paramText}>Fat (g):</Text>
              <TextInput onChangeText={setFat} value={fat} />
            </View>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => saveChanges()}>
                <Text style={styles.textStyle}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Add Meal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 360,
    height: 400,
  },
  buttonView: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonExit: {
    backgroundColor: 'red',
  },
  buttonSave: {
    backgroundColor: 'blue',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 32,
  },
  paramText: {
    color: 'white',
    fontSize: 20,
  },
});

export default EditMeal;
