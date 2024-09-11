import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const MessageParser = ({ children, actions, query }) => {
  const { t } = useTranslation(); 
  const hasRun = useRef(false); // To prevent multiple triggers

  useEffect(() => {
    if (query && !hasRun.current) {
      parse(query);
      hasRun.current = true; // Set the flag to prevent re-run
    }
  }, [query, t]); // Add 't' as a dependency to re-run when language changes

  const parse = (message) => {
    // Use translated text if query contains specific phrases that should change with language
    const hello = t("नमस्ते"); // Example for "hello"
    const dogPicture = t("dog_picture_response"); // Example for "dog"

    // Parsing conditions
    if (message.includes("नमस्ते") ||  message.includes("hello") || message.includes("Hii") || message.includes(hello.toLowerCase()))  {
      
      actions.handleHello();
    }
    if (message.includes("dog") || message.includes(dogPicture.toLowerCase())) {
      actions.handleDog();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
