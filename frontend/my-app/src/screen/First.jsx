import React, { useState } from "react";
import Language from "../Chatbot/Language";
import Third from "../Chatbot/Third";
import Second from "../Chatbot/Second";

import Chatbot from "./Chatbot";
import MainPage from "./MainPage";

const LanguageSelection = ({ setLanguage, goToNextStep, closechatbot }) => {
  return (
    <Language
      setLanguage={setLanguage}
      goToNextStep={goToNextStep}
      closechatbot={closechatbot}
    />
  );
};

const OperationsPage = ({
  goToNextStep,
  goToPreviousStep,
  setQuery,
  closechatbot,
}) => {
  return (
    <div>
      <Second
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
        setQuery={setQuery}
        closechatbot={closechatbot}
      />
    </div>
  );
};

const ChatPage = ({ setLanguage, goToPreviousStep, query, closechatbot }) => {
  return (
    <div>
      <Third
        setLanguage={setLanguage}
        goToPreviousStep={goToPreviousStep}
        query={query}
        closechatbot={closechatbot}
      />
    </div>
  );
};

const ChatBotApp = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("");
  const [query, setQuery] = useState("");

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);
  const closechatbot = () => setStep(1);

  return (
    <div className="">
      {/* Keep "hello" text visible across all steps */}

      <MainPage />
      {/* Conditionally render the chatbot content based on the current step */}
      <div className="flex justify-center items-center">
        {step === 1 && (
          <Chatbot
            goToNextStep={goToNextStep}
            setLanguage={setLanguage}
            closechatbot={closechatbot}
          />
        )}
        {step === 2 && (
          <LanguageSelection
            setLanguage={setLanguage}
            goToNextStep={goToNextStep}
            closechatbot={closechatbot}
          />
        )}
        {step === 3 && (
          <OperationsPage
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            setQuery={setQuery}
            closechatbot={closechatbot}
          />
        )}
        {step === 4 && (
          <ChatPage
            setLanguage={setLanguage}
            goToPreviousStep={goToPreviousStep}
            query={query}
            closechatbot={closechatbot}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBotApp;
