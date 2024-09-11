// import React from "react";

// // Initial page of the website with a button to start the chatbot
// export default function IntialPage({ goToNextStep }) {
//   const handleClick = () => {
//     goToNextStep();
//   };

//   return (
//     <div className="relative h-screen"> {/* Make the container full screen */}
//     <p>hello</p>
//       <button
//         onClick={handleClick}
//         className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition" // Tailwind CSS classes
//       >
//         Chatbot
//       </button>
//     </div>
//   );
// }
import React, { useState } from "react";
import Language from "../Chatbot/Language";

export default function Chatbot({ goToNextStep, closechatbot, setLanguage }) {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleClick = () => {
    setShowChatbot(true); // Show the chatbot when clicking the button
    goToNextStep(); // Trigger the next step if needed
  };

  return (
    <div >
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
      >
        Chatbot
      </button>

      {/* Conditionally render the chatbot, using absolute positioning */}
      {showChatbot && (
        <div className="chatbot-container fixed top-0 right-0 bottom-0 w-1/3 bg-white shadow-lg z-10 p-4">
          <Language setLanguage={setLanguage} goToNextStep={goToNextStep} closechatbot={closechatbot} />
        </div>
      )}
    </div>
  );
}
