const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const PORT = 4000;

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connecté => " + socket.id);

  // socket.on("EVENT")
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("User a rejoint la room " + room);
  });

  socket.on("send_message", (message) => {
    console.log("Send message", message);
    io.to(message.room).emit("new_message", {
      id: new Date().getTime(),
      ...message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User déconnecté", socket.id);
  });

  socket.on("chat_message", async (message) => {
    console.log("Chat message", message);
    let response;
    if (typeof message.content === "string") {
      try {
        const prompt = message.content;
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.2,
        });
        response = completion.data.choices[0].text.trim();
      } catch (err) {
        // console.error(err);
        console.log("data error", err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
        response = "Je n'ai pas compris. Pouvez-vous reformuler votre question ?";
      }
    } else {
      response = "Veuillez entrer un message valide.";
    }
    socket.emit("chat_message_response", response);
  });
});


app.get("/", (req, res) => {
  res.send("<h1>Ca marche</h1>");
});

server.listen(PORT, () => {
  console.log("Server is running on port = " + PORT);
});
