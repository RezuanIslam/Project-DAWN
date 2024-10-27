import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Experience } from "../components/farming-simulator-components/Experience";
import { SocketManager } from "../components/farming-simulator-components/SocketManager";
import {
  UI,
  shopModeAtom,
} from "../components/farming-simulator-components/UI";
import { useState } from "react";
import ollama from "ollama";

function FarmingSimulatorPage() {
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
        { role: "user", content: `${question}? Answer it in one sentence.` },
      ],
    });
    console.log(response.message.content);
    setchat(response.message.content);
  };
  return (
    <div className="relative h-screen w-screen flex justify-end items-center">
      <SocketManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <color attach="background" args={["#BAE6FD"]} />
        <ScrollControls pages={shopMode ? 4 : 0}>
          <Experience />
        </ScrollControls>
      </Canvas>
      <div className="absolute left-0 card bg-black w-96 flex flex-col justify-center items-center space-y-5 m-5 p-10 shadow-xl glass">
        <h1 className="text-3xl">Farm Suggestion</h1>
        <img src="Farm Infographic.png" />
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
      <div className="absolute card bg-black w-96 flex flex-col justify-center items-center space-y-5 m-5 p-10 shadow-xl glass">
        <h1 className="text-3xl">Farm Simulator</h1>
        <label className="input input-bordered flex items-center gap-2 w-80">
          Soil Moisture
          <input type="text" className="grow" placeholder="24.3" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-80">
          Air Temp.
          <input type="text" className="grow" placeholder="29.7" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-80">
          Humidity
          <input type="text" className="grow" placeholder="76.2" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-80">
          Soil temp.
          <input type="text" className="grow" placeholder="27.8" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-80">
          Soil pH
          <input type="text" className="grow" placeholder="6.3" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-80">
          Water pH
          <input type="text" className="grow" placeholder="7.1" />
        </label>
        <button
          className="btn btn-primary w-80"
          type="submit"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setGenerate(true);
              setLoading(false);
            }, 2000);
          }}
        >
          {loading && (
            <span className="loading loading-spinner text-primary-content loading-lg"></span>
          )}
          {generate ? "Farm condition is stable." : "Generate"}
        </button>
      </div>
      <UI />
    </div>
  );
}

export default FarmingSimulatorPage;
