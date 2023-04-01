//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

// create a component
const Welcome = ({ saveUsername }) => {
    const [username, setUsername] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.app_name}>ChatZen</Text>
            <Text style={styles.title}>Bienvenue ! </Text>
            <Text style={styles.caption}>Pseudo</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <Pressable style={styles.button} onPress={() => saveUsername(username)}>
                <Text style={styles.btnCaption}>Continuer</Text>
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    app_name: {
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 100,
        color : '#DC216E'
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    caption: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        marginBottom: 20,
        height: 40,
        width: 150,
        paddingHorizontal: 10,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#04CBCD",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    btnCaption: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
    },
});

//make this component available to the app
export default Welcome;
