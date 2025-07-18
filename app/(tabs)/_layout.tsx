import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="pokemonListTab"
        options={{
          title: "Pokemon List",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favouritePokemonTab"
        options={{
          title: "Favourites",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cameraTab"
        options={{
          title: "Camera",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mapTab"
        options={{
          title: "Map",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
