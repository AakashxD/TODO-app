import React from "react";
import { useTranslation } from "react-i18next";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}) => {
  const { t } = useTranslation(); // Use i18n translation hook

  const handleHello = () => {
    const botMessage = createChatBotMessage(t("hello_response") , {
      widget:"Ticketbooking",
    });
    setState((prev) => {
      const lastMessage = prev.messages[prev.messages.length - 1];
      if (lastMessage && lastMessage.message === botMessage.message) {
        return prev; // Do nothing if it's a duplicate
      }
      return {
        ...prev,
        messages: [...prev.messages, botMessage],
        
      };
    });
  };
  
  const handleDog = () => {
    const botMessage = createChatBotMessage(t("dog_picture_response"), {
      widget: "dogPicture",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
