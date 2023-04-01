//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

// create a component
const NewMessage = ({ username, socket }) => {
    const [content, setContent] = useState("");

    const onSend = () => {
        if (content.trim() === "") {
            return;
        }

        console.log("type du message : ", typeof content);
        let currentTime = new Date();
        let currentHour = currentTime.getHours() + 1;
        let currentMinute = currentTime.getMinutes();
        const message = {
            room: "let's chat",
            username,
            content: content.trim(),
            time: `${currentHour}:${currentMinute}`,
        };

        socket.emit("send_message", message);
        socket.emit("chat_message", message);
        setContent("");
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                multiline
            />
            <Pressable style={styles.btn} disabled={content === ""} onPress={onSend}>
                <Ionicons
                    name="send"
                    size={24}
                    color={content === "" ? "lightgrey" : "black"}
                />
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
    },
});


//make this component available to the app
export default NewMessage;
