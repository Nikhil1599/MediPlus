/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews ({totalRating})
        </h4>
        {reviews?.map((reviews, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img className="w-full" src={reviews.user?.photo} alt="" />
              </figure>

              <div>
                <h5 className="text-[16] leading-6 text-primaryColor font-bold">
                  {reviews.user?.name}
                </h5>
                <p className="text-[16] leading-6 text-textColor">
                  {formatDate(reviews?.createdAt)}
                </p>
                <p className="text_para mt-3 font-medium text-[15px]">
                  {reviews.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(reviews?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
