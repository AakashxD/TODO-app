import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IndianRupee } from "lucide-react";

// Constants for API endpoint and date limits
const API_URL = "http://localhost:4000/api/users/createuser";
const TODAY = new Date().toISOString().split("T")[0];
const MAX_DATE = (() => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split("T")[0];
})();

// Extract ticket prices from local storage
const getTicketPrices = () => {
  try {
    return (
      JSON.parse(localStorage.getItem("response")) || {
        children: 0,
        adult: 0,
        foreigner: 0,
      }
    );
  } catch (error) {
    console.error("Error parsing ticket prices:", error);
    return { children: 0, adult: 0, foreigner: 0 };
  }
};

const TicketBooking = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const ticketPrices = getTicketPrices();

  // Watch values for validation and price calculation
  const childrenTickets = watch("childrenTickets");
  const adultTickets = watch("adultTickets");
  const foreignerTickets = watch("foreignerTickets");

  // Custom validation function to ensure at least one ticket field is filled
  const validateAtLeastOneTicket = () => {
    return (
      Number(childrenTickets) > 0 ||
      Number(adultTickets) > 0 ||
      Number(foreignerTickets) > 0 ||
      "At least one ticket must be selected."
    );
  };

  // Calculate total ticket price based on inputs
  const calculateTotalPrice = () => {
    const childrenCount = childrenTickets || 0;
    const adultCount = adultTickets || 0;
    const foreignerCount = foreignerTickets || 0;
    return (
      childrenCount * ticketPrices.children +
      adultCount * ticketPrices.adult +
      foreignerCount * ticketPrices.foreigner
    );
  };

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to handle payment
  const createOrder = async (amount) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/payment/book-tickets",
        { amount }
      );
      paymenntverify(response.data);
      console.log("payment", response.data);
    } catch (error) {
      console.log("Internal server error:", error);
    }
  };

  const paymenntverify = async (data) => {
    // Wait for the Razorpay script to be loaded
    if (window.Razorpay) {
      const options = {
        key: "rzp_test_ue6nB2PR1kro4m", // Replace with your Key ID
        amount: data.amount * 100, // Amount in paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.id,
        callback_url: "http://localhost:4000/api/verify/verify-payment",
        handler: async function (response) {
          try {
            // Constructing the request body
            const body = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            };
        
            // Sending the POST request with the correct format
            const validateresponse = await axios.post(
              "http://localhost:4000/api/verify/verify-payment",
              body,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
              data
            ).then(response => {
              window.alert(response.data.message);
                // Display the message as an alert
            })
            .catch(error => {
              window.alert(error.response.data.message);  // Display error message
            });
        
            // Logging the response from the server
            console.log(validateresponse.data);
          } catch (error) {
            // Logging any errors that occur during the request
            console.error("Error during payment verification:", error);
          }
        },
        
        prefill: {
          name: "aayush",
          email: "aayush@example.com",
          contact: "8533908593",
        },
        notes: {
          address: "Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      alert("Razorpay SDK not loaded. Please refresh the page.");
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(API_URL, data);
      console.log("Response:", response.data);
      // handleclose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Museum Name"
            type="text"
            placeholder="Enter Museum Name"
            register={register("museumName", {
              required: "Museum Name is required",
            })}
            error={errors.museumName}
          />

          <FormInput
            label="Customer Name"
            type="text"
            placeholder="Enter Customer Name"
            register={register("userName", {
              required: "Customer Name is required",
            })}
            error={errors.userName}
          />

          <FormInput
            label="Mobile Number"
            type="tel"
            placeholder="Enter Mobile Number"
            register={register("mobileNumber", {
              required: "Mobile Number is required",
            })}
            error={errors.mobileNumber}
          />

          <FormInput
            label="Date"
            type="date"
            register={register("date", {
              required: "Date is required",
              validate: {
                minDate: (value) =>
                  new Date(value) >= new Date(TODAY) ||
                  `Date cannot be before ${TODAY}`,
                maxDate: (value) =>
                  new Date(value) <= new Date(MAX_DATE) ||
                  `Date cannot be after ${MAX_DATE}`,
              },
            })}
            error={errors.date}
            min={TODAY}
            max={MAX_DATE}
          />

          <TicketQuantityInput
            label="Children Tickets"
            placeholder="Enter number of children tickets"
            register={register("childrenTickets", {
              validate: validateAtLeastOneTicket,
              min: { value: 1, message: "Value must be at least 1" },
            })}
            error={errors.childrenTickets}
          />

          <TicketQuantityInput
            label="Adult Tickets"
            placeholder="Enter number of adult tickets"
            register={register("adultTickets", {
              validate: validateAtLeastOneTicket,
              min: { value: 1, message: "Value must be at least 1" },
            })}
            error={errors.adultTickets}
          />

          <TicketQuantityInput
            label="Foreigner Tickets"
            placeholder="Enter number of foreigner tickets"
            register={register("foreignerTickets", {
              validate: validateAtLeastOneTicket,
              min: { value: 1, message: "Value must be at least 1" },
            })}
            error={errors.foreignerTickets}
          />

          <SubmitButton amount={calculateTotalPrice()} createOrder={createOrder}/>
        </form>
      </div>
    </div>
  );
};

// Reusable form input component
const FormInput = ({ label, type, placeholder, register, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      {...register}
      className={`w-full px-3 py-2 border rounded-lg ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
      {...props}
      minLength={10}
      maxLength={10}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </div>
);

// Reusable ticket quantity input component
const TicketQuantityInput = ({ label, register, error, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-600">{label}</label>
    <input
      type="number"
      min="0"
      className={`w-full px-3 py-2 border rounded-lg ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...register}
      placeholder={placeholder}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </div>
);

// Submit button with total amount display
const SubmitButton = ({ amount , createOrder }) => (
  <button
    type="submit"
    onClick={(e) => {
      e.preventDefault(); // Prevent form submission to avoid page reload
      createOrder(amount);
    }}
    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  >
    <IndianRupee size={20} />
    Pay {amount} INR
  </button>
);

export default TicketBooking;
