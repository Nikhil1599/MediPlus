import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";
import useFetchReview from "../../hook/useFetchReview";
import { BASE_URL } from "../../config";

const Testimonials = () => {
  const {
    data: reviews,
    loading,
    error,
  } = useFetchReview(`${BASE_URL}/reviews`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <img src={patientAvatar} alt="Patient Avatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {review.user.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <HiStar
                          key={i}
                          className="text-yellowColor w-[18px] h-5"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {review.reviewText}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-center text-[16px] leading-7 text-textColor font-[400]">
        Swipe
      </p>
    </div>
  );
};

export default Testimonials;
