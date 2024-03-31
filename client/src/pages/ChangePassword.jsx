import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ChangePassword = () => {
  // hooks
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // change password
  const changeUserPassword = async (event) => {
    // prevent default behavior of form submit
    event.preventDefault();

    try {
      // getting response from server for change password API
      const response = await axios.put(
        "http://localhost:8000/user/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true, // for cookie
        }
      );

      console.log(response.data);

      // showing message to user
      toast.success(response.data.message);

      navigate("/user/profile");
    } catch (err) {
      console.log(err.response.data);
      // showing message to user
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <h1 className="text-2xl mt-5 mb-5">Change Password</h1>

      <form onSubmit={changeUserPassword} className="flex flex-col w-2/5">
        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500 mb-2.5"
          required
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500 mb-2.5"
          required
        />

        <button className="shadow bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ">
          Change password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
