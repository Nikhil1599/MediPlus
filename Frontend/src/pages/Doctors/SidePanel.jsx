import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import icon from "../../assets/images/doctor-img01.png";
/* eslint-disable react/prop-types */

const SidePanel = ({ userData }) => {
  if (!userData) {
    return null; // Return null if userData is not provided
  }

  const { ticketPrice, timeSlots } = userData; // Assuming doctorId is part of userData
  const doctorId = userData._id;
  const user = JSON.parse(localStorage.getItem("user"));

  const payment = async (amount) => {
    try {
      // Fetch the key
      const keyResponse = await fetch(`${BASE_URL}/getkey`, { method: "GET" });
      if (!keyResponse.ok) throw new Error("Failed to fetch key");
      const { key } = await keyResponse.json();

      // Fetch the order
      const orderResponse = await fetch(`${BASE_URL}/bookings/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, doctorId }), // Include doctorId in the request body
      });
      if (!orderResponse.ok) throw new Error("Failed to fetch order");
      const { order } = await orderResponse.json();

      // Payment options
      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MediPlus", // your business name
        description: "Test Transaction",
        image: icon,
        order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const body = { ...response, doctorId }; // Include doctorId in the validation request
          const validateRes = await fetch(`${BASE_URL}/bookings/order`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!validateRes.ok) throw new Error("Payment validation failed");
          const jsonRes = await validateRes.json();
          console.log(jsonRes);
          toast.success("Payment successful");
        },

        prefill: {
          // We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: user.name, // your customer's name
          email: user.email,
          contact: "9000090000", // Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // eslint-disable-next-line no-undef
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });

      rzp1.open();
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Consultant Fees</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          Rs. {ticketPrice}
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots && timeSlots.length > 0 ? (
            timeSlots.map((slot, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.startingTime} - {slot.endingTime}
                </p>
              </li>
            ))
          ) : (
            <li className="text-[15px] leading-6 text-textColor font-semibold">
              No available time slots
            </li>
          )}
        </ul>
      </div>
      <button
        onClick={() => payment(ticketPrice)}
        className="btn px-2 w-full rounded-md"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
