import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Chat from './screens/Chat';
import Welcome from './screens/Welcome';

export default function App() {
  // username
  const [username, setUsername] = useState("");

  const saveUsername = (name) => {
    setUsername(name);
  };

  // Welcome
  if (username === "") {
    return (
      <SafeAreaView style={styles.container}>
        <Welcome saveUsername={saveUsername} />
      </SafeAreaView>
    );
  }

  // Chat
  return (
    <SafeAreaView style={styles.container}>
      <Chat username={username} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});