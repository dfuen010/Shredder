// import {View, Text, Modal, Pressable, TextInput, StyleSheet, TouchableWithoutFeedback} from "react-native";
// import {useState} from "react";
//
// type CardioProps = {
//   edit: (timePerformed: number) => void,
//   isCreate: boolean,
// };
//
// type StrengthProps = {
//   edit: (parameter: string, amount: number) => void,
//   isCreate: boolean,
// };
//
// const EditCardio = ({edit, isCreate}: CardioProps) => {
//   return (
//     <>
//       {isCreate && <Text style={styles.paramText}>Name</Text>}
//       <Text style={styles.paramText}>Time Performed</Text><TextInput></TextInput>
//     </>
//   );
// };
//
// const EditStrength = ({edit, isCreate}: StrengthProps) => {
//   return (
//     <>
//       {isCreate && <Text style={styles.paramText}>Name</Text>}
//       <Text style={styles.paramText}>Sets</Text><TextInput></TextInput>
//       <Text style={styles.paramText}>Repetitions</Text>
//       <Text style={styles.paramText}>Weight per Set</Text>
//       <Text style={styles.paramText}>Time Performed</Text>
//     </>
//   );
// }
//
// type Props = {
//   exerciseType: string,
//   exerciseName: string,
//   isCreate: boolean,
// };
//
// const EditExercise = ({exerciseType, exerciseName, isCreate}: Props) => {
//   const [modalVisible, setModalVisible] = useState(false)
//   const editCardio = (timePerformed: number) => {}
//   const editStrength = (parameter: string, amount: number) => {}
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>{exerciseName}</Text>
//             {exerciseType === "Cardio" && <EditCardio edit={editCardio} isCreate={isCreate}/>}
//             {exerciseType === "Strength" && <EditStrength edit={editStrength} isCreate={isCreate}/>}
//             <View style={styles.buttonView}>
//               <Pressable
//                 style={[styles.button, styles.buttonExit]}
//                 onPress={() => setModalVisible(!modalVisible)}
//               >
//                 <Text style={styles.textStyle}>Close</Text>
//               </Pressable>
//               <Pressable
//                 style={[styles.button, styles.buttonSave]}
//                 onPress={() => setModalVisible(!modalVisible)}
//               >
//                 <Text style={styles.textStyle}>Save Changes</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>{exerciseName}</Text>
//       </Pressable>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "gray",
//     borderRadius: 20,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: 360,
//     height: 230,
//   },
//   buttonView: {
//     flexDirection: "row",
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonExit: {
//     backgroundColor: "red",
//   },
//   buttonSave: {
//     backgroundColor: "blue",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//     color: "white",
//     fontSize: 32,
//   },
//   paramText: {
//     color: "white",
//     fontSize: 20,
//   },
// });
//
// export default EditExercise;

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

const EditExercise = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');
  const [exList, setExList] = useState('');

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
          (_, {rows}) => setExList(JSON.stringify(rows._array[0].Exercises)),
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
        'INSERT INTO Exercises (Name, Sets, Repetitions, WeightPS, Time) Values (?,?,?,?,?)',
        [name, sets, reps, weight, time],
        (_, {}) => console.log('check'),
      );
    });
    console.log(route.params.id);
    let temp = '';
    if (exList == '""') {
      temp = name;
    } else {
      temp = exList + ', ' + name;
      temp = temp.replace(/"/g, '');
    }
    console.log(temp);
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        "UPDATE Users SET Exercises='" +
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
            <Text style={styles.modalText}>Add Exercise</Text>
            <View>
              <Text style={styles.paramText}>Name:</Text>
              <TextInput onChangeText={setName} value={name} />
            </View>
            <View>
              <Text style={styles.paramText}>Sets:</Text>
              <TextInput onChangeText={setSets} value={sets} />
            </View>
            <View>
              <Text style={styles.paramText}>Repetitions:</Text>
              <TextInput onChangeText={setReps} value={reps} />
            </View>
            <View>
              <Text style={styles.paramText}>Weight Per Set:</Text>
              <TextInput onChangeText={setWeight} value={weight} />
            </View>
            <View>
              <Text style={styles.paramText}>Time:</Text>
              <TextInput onChangeText={setTime} value={time} />
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
        <Text style={styles.textStyle}>Add Exercise</Text>
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

export default EditExercise;
