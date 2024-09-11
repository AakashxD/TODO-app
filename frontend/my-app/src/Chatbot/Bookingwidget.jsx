import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Activity, Info, Tickets, PhoneCall } from "lucide-react";
import TicketBooking from "../components/TicketBooking";
import axios from "axios";

const MetroMenu = () => {
  const [visible, setIsVisible] = useState(false);

  const handleBookTicket = async() => {
    setIsVisible(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/prices/ticketprice"
      );

      console.log("response", response);
      localStorage.setItem("response", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-4 p-4 h-full">
      <button
        className="px-6 py-3 bg-sky-500 text-white rounded-2xl shadow transition flex gap-1 hover:scale-105"
        onClick={handleBookTicket} 
      >
        Book Your Ticket Online{" "} 
        <span>
          <Tickets  />
        </span>
      </button>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <button className="flex items-center justify-between p-3 bg-orange-100 rounded-2xl shadow hover:scale-105 transition min-w-[130px]">
          <span>Calculate Fare</span> <FaRupeeSign />
        </button>
        <button className="flex items-center justify-between p-3 bg-lime-100 rounded-2xl shadow hover:scale-105 transition min-w-[130px]">
          <span>Service Status</span> <Activity size={16} />
        </button>
        <button className="flex items-center justify-between p-3 bg-sky-100 rounded-2xl shadow hover:scale-105 transition min-w-[130px]">
          <span>Helpline</span> <PhoneCall size={16} />
        </button>
        <button className="flex items-center justify-between p-3 bg-yellow-100 rounded-2xl shadow hover:scale-105 transition min-w-[130px] gap-1">
          <span>About Museum</span> <Info size={16} />
        </button>
      </div>

      {/* Popup for Ticket Booking within the Chatbot Area */}
      {visible && (
        <>
          <>
            {/* <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={handleclose}
            >
              ✕
            </button> */}
            <TicketBooking handleClose={handleClose} />
          </>
        </>
      )}
    </div>
  );
};

export default MetroMenu;
