import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function Card({ navigation, id, name, image, species, status, gender }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.textName}>{name}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.iconContainer}>
        {species == "Human" ? (
          <MaterialCommunityIcons name="human" size={24} color="black" />
        ) : species == "Alien" ? (
          <MaterialCommunityIcons name="alien" size={24} color="lime" />
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
        {status == "Alive" ? (
          <MaterialCommunityIcons
            name="account-heart"
            size={24}
            color="#00FA9A"
          />
        ) : status == "Dead" ? (
          <MaterialCommunityIcons name="skull" size={24} color="black" />
        ) : (
          <FontAwesome name="question" size={24} color="black" />
        )}
        {gender == "Male" ? (
          <Ionicons name="male" size={24} color="blue" />
        ) : (
          <Ionicons name="female" size={24} color="pink" />
        )}
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    borderRadius: 50,
    margin: 12,
    padding: 26,
    backgroundColor: "rgba(0,0,150,0.1)",
  },
  textName: {
    fontSize: 16,
    fontWeight: "700",
  },
  imageContainer: {
    minHeight: 250,
    maxHeight: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
