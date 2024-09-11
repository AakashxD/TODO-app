


// CustomChatIcon.jsx
import React from 'react';

const ChatIconCustom = () => {
  return (
    <div className="custom-chat-icon">
      {/* Your SVG or Icon Component */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17V13H17V11H13V7H11V11H7V13H11V17H13Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
};

export default ChatIconCustom;
