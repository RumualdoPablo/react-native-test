import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ExtraInfo from "../ExtraInfo";

type CardProps = {
  item: Character | Location | Episode;
};

const Card = ({ item }: CardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const isCharacter = (i: any): i is Character =>
    "status" in i && "species" in i && "gender" in i && "origin" in i;
  const isLocation = (i: any): i is Location =>
    "dimension" in i && "type" in i && !("episode" in i);
  const isEpisode = (i: any): i is Episode => "air_date" in i && "episode" in i;

  let info: Record<string, any> = {};
  let image: string | undefined;
  if (isCharacter(item)) {
    const { name, status, species, gender, origin } = item;
    info = { name, status, species, gender, origin };
    image = item.image;
  } else if (isLocation(item)) {
    const { name, dimension, type } = item;
    info = { name, dimension, type };
  } else if (isEpisode(item)) {
    const { name, air_date, episode } = item;
    info = { name, air_date, episode };
  }
  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.text}>{item.name}</Text>
        {isLocation(item) && <Text style={styles.text}>{item.dimension}</Text>}
        {isEpisode(item) && <Text style={styles.text}>{item.episode}</Text>}
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
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <ExtraInfo info={info} />
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

export default Card;

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
