import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Card from "./components/card";

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
      <Card
        key={e.id}
        id={e.id}
        name={e.name}
        image={e.image}
        species={e.species}
        status={e.status}
        gender={e.gender}
      />
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
