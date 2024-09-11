import React, { useState } from "react";
import "../hooks/i18n";
import { useTranslation } from "react-i18next";

import Modals from "../components/Modals";
import { X } from "lucide-react";

export default function Language({
  setLanguage,
  goToNextStep,
  closechatbot,
  showChatbot,
}) {
  const { t, i18n } = useTranslation();

  const [showModel, setShowModel] = useState(false);

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setShowModel(true);
    i18n.changeLanguage(languageCode);
  };
  
  const handleCloseChatbot = () => {
    closechatbot();
  };

  return (
    <div className="fixed bottom-4 right-4 w-[21.875rem] h-[35.625rem] bg-blue-500 p-4 md:p-6 rounded-lg shadow-lg 
                    sm:w-[18rem] sm:h-[30rem] 
                    md:w-[20rem] md:h-[32rem] 
                    lg:w-[21.875rem] lg:h-[35.625rem]">
      <button
        onClick={handleCloseChatbot}
        className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition"
      >
        <X />
      </button>
      <h2 className="text-white text-lg mb-4 mt-4 text-center">
        {t("Select Language")}
      </h2>
      <div className="space-y-2">
        <button
          onClick={() => handleLanguageChange("en")}
          className="w-full bg-white text-blue-500 py-2 rounded hover:bg-gray-200 transition"
        >
          {t("English")}
        </button>
        <button
          onClick={() => handleLanguageChange("Hi")}
          className="w-full bg-white text-blue-500 py-2 rounded hover:bg-gray-200 transition"
        >
          {t("Spanish")}
        </button>
        <button
          onClick={() => handleLanguageChange("fr")}
          className="w-full bg-white text-blue-500 py-2 rounded hover:bg-gray-200 transition"
        >
          {t("French")}
        </button>
      </div>
      <div>{showModel && <Modals goToNextStep={goToNextStep} />}</div>
    </div>
  );
}
