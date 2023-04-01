//import liraries
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, FlatList, View } from 'react-native';
import NewMessage from '../components/NewMessage';
import Message from '../components/Message';
import Response from '../components/Response';
import io from "socket.io-client";

// Socket.io config
const socket = io("http://192.168.0.16:4000/");

// create a component
const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    // Room connection
    socket.emit("join_room", "let's chat");
    // Messages => envoie + reception
    socket.on("new_message", (data) => {
      console.log("message recu", data);
      setMessages((current) => [...current, data]);
    });
    socket.on("chat_message_response", (data) => {
      console.log("message recu", data);
      setResponse(data);
    });
  }, []);

  const renderItem = ({ item, index }) => {
    if (item.isResponse && response) {
      return <Response msg={response} />;
    } else {
      return <Message username={username} message={item} />;
    }
  };
  

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: message,
      username: username,
      time: new Date().toLocaleString(),
    };
    setMessages((current) => [...current, newMessage]);
    socket.emit("send_message", { message: newMessage, room: "let's chat" }, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Message sent successfully");
      }
    });
  };
  

  const handleContentSizeChange = () => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      scrollEnabled
      style={styles.keyboard}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListFooterComponent={<View style={{ height: 60 }} />}
        onContentSizeChange={handleContentSizeChange}
        ref={flatListRef}
      />
      {response && <Response msg={response} />}
      <NewMessage handleSendMessage={handleSendMessage} username={username} socket={socket}/>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    paddingBottom: 10,
    marginTop: 50
  },
  flatList: {
    paddingHorizontal: 20,
  },
});

//make this component available to the app
export default Chat;
