//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Response = ({ msg }) => {
    return (
        <View
            style={{
                alignSelf: "flex-start",
            }}
        >
            {/* <Text style={styles.username}>Server</Text> */}
            <Text
                style={[
                    styles.content,
                    {
                        backgroundColor: "lightgrey",
                    },
                ]}
            >
                {msg + "\n"}
                <View>
                    <Text style={{fontSize:11, marginTop: 6}}></Text>
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
export default Response;
