import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Experience } from "../components/exoplanet-exploration-components/Experience";
import { SocketManager } from "../components/exoplanet-exploration-components/SocketManager";
import {
  UI,
  shopModeAtom,
} from "../components/exoplanet-exploration-components/UI";
import { useState } from "react";
import ollama from "ollama";
function ExoplanetExplorationPage() {
  const [generate, setGenerate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopMode] = useAtom(shopModeAtom);
  const [question, setQuestion] = useState("");
  const [chat, setchat] = useState("");

  const askQuestions = async (e) => {
    e.preventDefault();
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [
        {
          role: "user",
          content: `Imagine I am at an exoplanet. ${question}? Tell me in 1 to 3 sentences`,
        },
      ],
    });
    console.log(response.message.content);
    setchat(response.message.content);
  };
  return (
    <div className="relative h-screen w-screen flex justify-end items-center">
      <SocketManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={shopMode ? 4 : 0}>
          <Experience />
        </ScrollControls>
      </Canvas>
      <div className="bg-opacity-25 absolute left-0 card bg-black w-96 flex flex-col justify-center items-center space-y-5 m-5 p-10 shadow-xl">
        <h1 className="text-3xl">Exoplanet Explorar</h1>
        {chat ? (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">{chat}</div>
          </div>
        ) : (
          ""
        )}
        <form onSubmit={askQuestions} className="space-y-3">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          />
          <button className="btn btn-primary w-full" type="submit">
            Ask
          </button>
        </form>
      </div>
      <UI />
    </div>
  );
}

export default ExoplanetExplorationPage;
