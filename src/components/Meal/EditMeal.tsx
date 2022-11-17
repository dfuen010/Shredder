import {View, Modal, Text, Pressable, StyleSheet, TextInput} from "react-native"; 
import { useState } from "react";

const MEAL_PARAMS = ["Meal:", "Name:", "Calories:", "Protein (g):", "Carbohydrates (g):", "Fat (g):"];

type Props = {
  isCreate: boolean,
  mealName: string,
};

const EditMeal = ({isCreate, mealName}: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{mealName}</Text>
            {MEAL_PARAMS.map((param) => {
              return (
                <View >
                  <Text style={styles.paramText}>{param}</Text>
                  <TextInput></TextInput>
                </View>
              )
            })}
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{mealName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 360,
    height: 300,
  },
  buttonView: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonExit: {
    backgroundColor: "red",
  },
  buttonSave: {
    backgroundColor: "blue",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 32,
  },
  paramText: {
    color: "white",
    fontSize: 20,
  },

});

export default EditMeal;