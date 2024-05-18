/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL, token } from "../../config";

const Profile = ({ user }) => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    try {
      const file = event.target.files[0];
      const data = await uploadImageToCloudinary(file);

      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="mt-10">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Enter full name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-solid border-2 border-[#0066ff61] focus:outline-none 
              focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-solid border-2 border-[#0066ff61] focus:outline-none 
              focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
          aria-readonly
          readOnly
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          placeholder="Password"
          name="password"
          //onChange={handleInputChange}
          className="w-full px-4 py-3 border-solid border-2 border-[#0066ff61] focus:outline-none 
              focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Blood Type"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-solid border-2 border-[#0066ff61] focus:outline-none 
              focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
          required
        />
      </div>
      <div className="mb-5 items-center justify-between">
        <label className="text-headingColor font-semibold text-[16px] leading-7">
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="text-textColor font-semibold text-[15px] leading-7
                  px-4 py-3 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <div className="mb-5 flex items-center gap-3">
        {formData.photo && (
          <figure
            className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center"
          >
            <img
              src={formData.photo}
              className="w-full rounded-full"
              alt="Profile"
            />
          </figure>
        )}
        <div className="relative w-[130px] h-[50px]">
          <input
            type="file"
            name="photo"
            id="customFile"
            onChange={handleFileInputChange}
            accept=".jpg, .png"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <label
            htmlFor="customFile"
            className="absolute top-0 left-0 w-full h-full flex items-center
                  px-[0.75rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold
                  rounded-lg truncate cursor-pointer"
          >
            Upload Photo
          </label>
        </div>
      </div>
      <div className="mt-7">
        <button
          disabled={loading}
          className="w-full bg-primaryColor text-white text-[18px] leading-[30px]
                rounded-lg px-4 py-3 font-medium"
        >
          {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
        </button>
      </div>
      <p className="mt-5 text-textColor text-center">
        Already have an account?
        <Link to="/login" className="text-primaryColor font-medium ml-1">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Profile;
