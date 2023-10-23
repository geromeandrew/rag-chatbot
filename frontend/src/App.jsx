import React from "react";
import "./App.css";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="landing-page">
      <div className="container text-center">
        <h1 className="display-3">LenraTech Bot</h1>
        <p className="lead">
          Your AI conversation partner using Retrieval-Augmented Generation
        </p>
      </div>
      <ChatWidget />
    </div>
  );
}

export default App;
