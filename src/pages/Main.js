import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const {latitude, longitude} = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        })
      }
    }
    loadInitialPosition();
  }, [])

  if(!currentRegion) {
    return null;
  }

  return <MapView 
          style={styles.map}
          initialRegion={currentRegion}
         />
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})

export default Main;