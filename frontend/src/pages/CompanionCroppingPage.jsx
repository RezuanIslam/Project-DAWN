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

function CompanionCroppingPage() {
  const [generate, setGenerate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopMode] = useAtom(shopModeAtom);
  const [question, setQuestion] = useState("");
  const [chat, setchat] = useState("");
  const askQuestions = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [
        {
          role: "user",
          content: `what is the best crop companion for ${question}? Give me an short answer.`,
        },
      ],
    });
    console.log(response.message.content);
    setLoading(false);
    setchat(response.message.content);
  };
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('closeup-shot-rice-plant-sunset-with-plantation-background.jpg')",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md space-y-5 card bg-primary-content p-10">
          <h1 className="text-3xl">Companion Cropping</h1>
          {chat ? (
            <div className="chat chat-start w-96">
              <div className="chat-bubble chat-bubble-primary">{chat}</div>
            </div>
          ) : (
            ""
          )}
          {loading && (
            <span className="loading loading-spinner text-primary loading-lg"></span>
          )}
          <form onSubmit={askQuestions} className="space-y-3">
            <input
              type="text"
              placeholder="Crop Name"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={(event) => {
                setQuestion(event.target.value);
              }}
            />
            <button className="btn btn-primary w-full" type="submit">
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanionCroppingPage;
