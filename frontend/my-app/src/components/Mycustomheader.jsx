import React, { useState, startTransition } from "react";
import { useTranslation } from "react-i18next";
import { X, ArrowLeft, Languages, Bot } from "lucide-react";
import "../hooks/i18n";

function App({ goToPreviousStep, closeChatbot }) {
  const { i18n } = useTranslation();
  const languages = ["en", "fr", "hi", "bn"]; // Adjusted languages to ISO codes for consistency
  const [, setCurrentLanguageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageToggle = (lang, index) => {
    startTransition(() => {
      i18n.changeLanguage(lang);
      setCurrentLanguageIndex(index);
    });
    setIsDropdownOpen(false); // Close dropdown after selecting language
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-yellow-200 h-16 w-[22rem] rounded-t-lg flex items-center justify-between px-4 relative">
      {/* Language Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="text-black p-2 rounded transition hover:bg-yellow-300"
        aria-label="Toggle Language"
      >
        <Languages />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <ul className="absolute right-14 top-10 bg-white border border-gray-300 rounded shadow-lg z-10">
          {languages.map((lang, index) => (
            <li key={lang}>
              <button
                onClick={() => handleLanguageToggle(lang, index)}
                className="block px-4 py-2 text-black hover:bg-gray-200 w-full text-left"
                aria-label={`Change language to ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ChatBot Avatar/Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500">
        <Bot size={20} className="text-white" />
      </div>

      {/* Back Button */}
      <button
        onClick={goToPreviousStep}
        className="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-300 transition"
        aria-label="Go Back"
      >
        <ArrowLeft />
      </button>

      {/* Close Chatbot Button */}
      <button
        onClick={closeChatbot}
        className="text-black p-2 rounded transition hover:bg-red-300"
        aria-label="Close Chatbot"
      >
        <X />
      </button>
    </div>
  );
}

export default App;
