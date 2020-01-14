import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Camera from './components/camera';

export default function App() {
  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    return <Camera setShowCamera={setShowCamera} />
  }

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={() => setShowCamera(true)}>
        <Text>Start snapping!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    padding: 20,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
});
