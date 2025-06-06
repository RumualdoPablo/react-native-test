import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GenericListScreen from "./screens/GenericListScreen";
import CharacterCard from "./components/Cards/CharactedCard";
import LocationsCard from "./components/Cards/LocationsCard";
import EpisodeCard from "./components/Cards/EpisodeCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = "help-circle";
              if (route.name === "Characters") {
                iconName = "person";
              } else if (route.name === "Locations") {
                iconName = "map";
              } else if (route.name === "Episodes") {
                iconName = "film";
              }
              return (
                <Ionicons name={iconName as any} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: "#3fa796",
            tabBarInactiveTintColor: "#b5bac8",
            tabBarStyle: { backgroundColor: "#23272f" },
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#23272f" },
            headerTintColor: "#f5f6fa",
          })}
        >
          <Tab.Screen
            name="Characters"
            children={() => (
              <GenericListScreen
                endpoint="https://rickandmortyapi.com/api/character"
                renderItem={({ item }: { item: Character }) => (
                  <CharacterCard item={item} />
                )}
              />
            )}
          />
          <Tab.Screen
            name="Locations"
            children={() => (
              <GenericListScreen
                endpoint="https://rickandmortyapi.com/api/location"
                renderItem={({ item }: { item: Location }) => (
                  <LocationsCard item={item} />
                )}
              />
            )}
          />
          <Tab.Screen
            name="Episodes"
            children={() => (
              <GenericListScreen
                endpoint="https://rickandmortyapi.com/api/episode"
                renderItem={({ item }: { item: Episode }) => (
                  <EpisodeCard item={item} />
                )}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bbbbbb",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    marginTop: 120,
  },
});
