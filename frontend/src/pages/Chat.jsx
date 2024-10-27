import React, { useEffect } from "react";
import ollama from "ollama";

const Chat = () => {
  const yo = async () => {
    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: "Why is the sky blue?" }],
    });
    console.log(response.message.content);
  };
  useEffect(() => {
    yo();
  }, []);

  return <div>Chat</div>;
};

export default Chat;
