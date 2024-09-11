import DogPicture from "../components/DogPicture.jsx";
import { createClientMessage } from "react-chatbot-kit";
import MessageParser from "../components/MessageParser.jsx";
import ActionProvider from "../components/ActionProvider.jsx";
import Mycustomheader from "../components/Mycustomheader.jsx";
import { Send } from "lucide-react";
import ChatBotAvatar from "../components/ChatBotAvatar.jsx";
import TicketBooking from "../components/TicketBooking.jsx";

const config = ({ goToPreviousStep, query, closechatbot }) => {
  return {
    customStyles: {
      botMessageBox: {
        backgroundColor: "#376B7E",
      },
      chatButton: {
        backgroundColor: "#5ccc9d",
      },
    },
    initialMessages: [createClientMessage(`${query}`)],

    customComponents: {
      header: () => (
        <Mycustomheader
          goToPreviousStep={goToPreviousStep}
          closechatbot={closechatbot}
        />
      ),
      botAvatar: () => <ChatBotAvatar/>,
      botChatMessage: (props) => {
        if (!props.message || !props.message.trim()) {
          return null;
        }
        return (
          <div className="react-chatbot-kit-chat-bot-message-container">
            <div className="react-chatbot-kit-chat-bot-message">
              {props.message}
            </div>
          </div>
        );
      },
    },

    widgets: [
      {
        widgetName: "dogPicture",
        widgetFunc: (props) => <DogPicture {...props} />,
      },
      {
        widgetName:"Ticketbooking",
        widgetFunc: (props) =><TicketBooking {...props}/>
      }
    ],
    actionProvider: (props) => (
      <ActionProvider
        {...props}
        createClientMessage={createClientMessage} // Pass createClientMessage explicitly
        query={query}
      />
    ),
    messageParser: (props) => <MessageParser {...props} query={query} />,
  };
};

export default config;
