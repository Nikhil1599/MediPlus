import { formatDate } from "../../utils/formateDate";

const DoctorAbout = () => {
  return (
    <>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-cyan-600 font-bold text-[24px] leading-9">
            Dr. Nikhilesh Singh
          </span>
        </h3>
        <p className="text_para">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          voluptatum quibusdam iste cum at quod fugiat? Officia illum vel harum
          consequuntur praesentium, quaerat eos, ipsa nam eaque suscipit maxime
          officiis?
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-cyan-600 text-[15px] leading-6 font-semibold">
                {formatDate("10-06-2008")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PhD in Surgeon
              </p>
            </div>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              AIMS
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-cyan-600 text-[15px] leading-6 font-semibold">
                {formatDate("12-10-2006")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                Master in Surgery
              </p>
            </div>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              AIMS
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor leading-6 font-semibold">
              {formatDate("07-10-2008")} - {formatDate("10-11-2018")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon & Consultant
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Jupiter Multispecialist Hospital, Thane
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor leading-6 font-semibold">
              {formatDate("07-11-2018")} - Present
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Leelavati Multispecialist Hospital, Mumbai
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DoctorAbout;
