import { useState } from "react";
import FarmMonitoringHistoryPage from "./FarmMonitoringHistoryPage";
import ollama from "ollama";

const DashboardPage = () => {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestions = async () => {
    setLoading(true);
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [
        {
          role: "user",
          content: `Generate me tasks for managing my farm today.`,
        },
      ],
    });
    console.log(response.message.content);
    setChat(response.message.content);
    setLoading(false);
  };

  const parseTasks = (chatText) => {
    const sections = chatText.split("**");
    let tasks = [];

    sections.forEach((section, index) => {
      // Even index sections contain titles, odd index sections contain tasks
      if (index % 2 === 1) {
        let taskTitle = sections[index - 1].trim();
        let taskItems = section
          .split("\n")
          .filter((task) => task.trim() !== "");
        tasks.push({ title: taskTitle, items: taskItems });
      }
    });

    return tasks;
  };

  const renderTaskList = (tasks) => {
    return (
      <div className="task-list">
        {tasks.map((taskSection, index) => (
          <div key={index} className="task-section">
            <h3 className="text-lg font-bold mt-4">{taskSection.title}</h3>
            <ul className="list-disc pl-6">
              {taskSection.items.map((task, idx) => (
                <li key={idx} className="mb-1">
                  {task.trim()}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const tasks = chat ? parseTasks(chat) : [];

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('closeup-shot-rice-plant-sunset-with-plantation-background.jpg')",
      }}
    >
      <div className="flex flex-col gap-4 w-full p-4">
        {chat ? (
          <div className="bg-primary-content p-4 rounded-lg">
            <h1 className="text-3xl">Tasks</h1>
            {renderTaskList(tasks)}
          </div>
        ) : (
          <div className="btn btn-primary-content" onClick={askQuestions}>
            {loading && (
              <span className="loading loading-spinner text-primary loading-lg"></span>
            )}
            <button>Generate tasks</button>
          </div>
        )}

        <div className="">
          <FarmMonitoringHistoryPage />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
