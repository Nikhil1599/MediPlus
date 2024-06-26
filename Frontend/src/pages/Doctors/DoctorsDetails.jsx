import { BASE_URL } from "../../config";
import useFetchData from "../../hook/useFetchData";
import Loader from "../../components/Loader/loading";
import Error from "../../components/Error/Error";
import starIcon from "../../assets/images/Star.png";
import Feedback from "./Feedback";
import DoctorAbout from "./DoctorAbout";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DoctorsDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  if (loading) return <Loader />;
  if (error) return <Error />;

  if (!doctor) return null; // Ensure doctor is defined before destructuring

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    photo,
  } = doctor;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={photo} alt={name} className="w-full rounded-lg" />
              </figure>
              <div>
                <span
                  className="bg-[#CCF0F3] text-cyan-700 py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4
                lg:text-[16px] lg:leading-7 font-semibold rounded"
                >
                  {specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  Dr. {name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span
                    className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7
                  font-semibold text-headingColor"
                  >
                    <img src={starIcon} alt="rating" />
                    {averageRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({totalRating})
                  </span>
                </div>
                <p className="text_para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                  {bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && (
                <DoctorAbout
                  name={name}
                  about={about}
                  qualifications={qualifications}
                  experiences={experiences}
                />
              )}
              {tab === "feedback" && (
                <Feedback reviews={reviews} totalRating={totalRating} />
              )}
            </div>
          </div>
          <div>
            <SidePanel userData={doctor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsDetails;
