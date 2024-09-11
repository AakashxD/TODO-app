import React, { useState } from "react";
import Mycustomheader from "../components/Mycustomheader";
import ImageCarousel from "../components/ImageCarousel";
import Bookingwidget from "./Bookingwidget";
import {  SendHorizonal } from "lucide-react";

export default function Second({
  goToNextStep,
  goToPreviousStep,
  setQuery,
  closechatbot,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleNextStep = (e) => {
    e.preventDefault()
    if (typeof setQuery === "function") {
      setQuery(inputValue);
    }
    if (inputValue) {
      goToNextStep();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[21.875rem] h-[35.625rem] bg-[#ede9e9] rounded-lg shadow-lg overflow-hidden flex-col justify-between">
      {/* Header Section */}
      <Mycustomheader 
        goToPreviousStep={goToPreviousStep}
        closechatbot={closechatbot}
      />
      
      {/* Carousel Section - Remove extra margins/padding */}
      <div className="flex justify-center items-center mt-0 pt-0 pb-0 mb-0">
        <ImageCarousel />
      </div>
      <div>
        <Bookingwidget/>
      </div>
      
      {/* Input and Button Section */}
      <form className="flex items-center mt-4 px-2" onSubmit={handleNextStep}>
      <div className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm ">
        <input
          className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
          placeholder="You can asked your Question here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="bg-green-400 text-white px-4 py-2 flex items-center justify-center hover:bg-green-500 transition"
          onClick={handleNextStep}
        >
          <SendHorizonal />
        </button>
      </div>
    </form>
      
    </div>
  );
}
