import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ExtraInfo from "../ExtraInfo";

const CharactedCard = ({ item }: { item: Character }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { name, status, species, gender, origin } = item;
  const characterInfo = { name, status, species, gender, origin };
  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <ExtraInfo info={characterInfo} />
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                }}
                android_ripple={{ color: "#b3f0e6" }}
              >
                <Text style={styles.buttonText}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CharactedCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "100%",
    backgroundColor: "#23272f", // dark card background
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#3fa796", // accent border
    marginBottom: 16,
    backgroundColor: "#181a20",
  },
  text: {
    fontSize: 24,
    maxWidth: "80%",
    fontWeight: "bold",
    color: "#f5f6fa",
    textAlign: "center",
    marginBottom: 8,
  },
  species: {
    fontSize: 18,
    color: "#b5bac8",
    textAlign: "center",
    marginBottom: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(20, 22, 30, 0.98)", // dark modal background
    padding: 24,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#23272f",
    borderRadius: 24,
    alignItems: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 16,
    backgroundColor: "#3fa796",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#181a20",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
