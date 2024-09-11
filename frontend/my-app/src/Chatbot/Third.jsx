import React from "react";
import "../App.css";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import createConfig from "../config/config.js";
import MessageParser from "../components/MessageParser.jsx";
import ActionProvider from "../components/ActionProvider.jsx";
import "../hooks/i18n.js";

function Third({ goToPreviousStep, query, closechatbot }) {
  // Ensure query is passed here
  const config = createConfig({ goToPreviousStep, query, closechatbot });

  return (
    <div className="fixed bottom-4 right-4 w-[21.875rem] h-[35.625rem] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
      
      <Chatbot
        config={config}
        messageParser={(props) => <MessageParser {...props} query={query} />} // Explicitly pass query here
        actionProvider={(props) => <ActionProvider {...props} query={query} />} // Ensure query is passed to ActionProvider as well
        placeholderText="You can asked your Question here"
        
      />
      
    </div>
  );
}

export default Third;
