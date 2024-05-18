/* eslint-disable react/prop-types */
const SidePanel = ({ userData }) => {
  if (!userData) {
    return null; // Return null if userData is not provided
  }

  const { ticketPrice, timeSlots } = userData;

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
      <button className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
