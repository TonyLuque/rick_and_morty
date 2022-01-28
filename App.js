import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const axios = require("axios");

export default function App() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);

  const url = "https://rickandmortyapi.com/api/character";

  useEffect(async () => {
    try {
      const response = await axios.get(url, { params: { page: page } });
      setData(response);
    } catch (error) {
      console.error(error);
    }
  }, [page]);

  // console.log(data?.data.results);
  if (data == undefined) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }
  const info = data.data.info;

  let pages = [];
  for (let i = page; i < page + 6; i++) {
    pages.push(
      i <= info.pages && (
        <TouchableOpacity
          onPress={() => setPage(i)}
          style={{
            width: 30,
            height: 30,
            backgroundColor: i == page ? "purple" : "gray",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 6,
          }}
        >
          <Text key={"page " + i} style={{ color: "white" }}>
            {i}
          </Text>
        </TouchableOpacity>
      )
    );
  }

  const cards = data.data.results.map((e) => {
    return (
      <View key={e.id}>
        <Text>{e.name}</Text>
        <Image source={{ uri: e.image }} style={{ width: 300, height: 300 }} />
        {e.species == "Human" ? (
          <MaterialCommunityIcons name="human" size={24} color="black" />
        ) : e.species == "Alien" ? (
          <MaterialCommunityIcons name="alien" size={24} color="lime" />
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
        {e.status == "Alive" ? (
          <MaterialCommunityIcons
            name="account-heart"
            size={24}
            color="#00FA9A"
          />
        ) : e.status == "Dead" ? (
          <MaterialCommunityIcons name="skull" size={24} color="black" />
        ) : (
          <FontAwesome name="question" size={24} color="black" />
        )}
        {e.gender == "Male" ? (
          <Ionicons name="male" size={24} color="blue" />
        ) : (
          <Ionicons name="female" size={24} color="pink" />
        )}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%" }}
      >
        {cards}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {info.prev != null && (
          <TouchableOpacity onPress={() => setPage(page - 1)}>
            <Text>Anterior</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pages}
        </View>
        {info.next != null ? (
          <TouchableOpacity onPress={() => setPage(page + 1)}>
            <Text>Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
