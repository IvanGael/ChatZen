//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Message = ({ message, username, response }) => {
    return (
        <View
            style={{
                alignSelf: username == message.username ? "flex-end" : "flex-start",
            }}
        >
            <Text style={styles.username}>{username == message.username ? "" : message.username}</Text>
            <Text
                style={[
                    styles.content,
                    {
                        backgroundColor:
                            username == message.username ? "lightgreen" : "lightgrey",
                    },
                ]}
            >
                {message.content + "\n"}
                <View>
                    <Text style={{fontSize:11, marginTop: 6}}>{message.time}</Text>
                </View>
            </Text>
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    content: {
        padding: 10,
        borderRadius: 6,
        marginBottom: 5,
        fontSize: 25
    },
    username: {
        fontWeight: "bold",
        fontSize: 14,
    },
});

//make this component available to the app
export default Message;
