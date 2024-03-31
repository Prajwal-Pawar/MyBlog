import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [fetchedUser, serFetchedUser] = useState(null);

  // get user from context API
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  // get user info from user id
  const getUser = async (userId) => {
    try {
      // getting response from server for user profile API
      const response = await axios.get(
        `http://localhost:8000/user/profile/${userId}`,
        {
          withCredentials: true, // for cookie
        }
      );

      console.log(response.data.user);

      serFetchedUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser(user._id);
    }
  }, [user]);

  // delete user
  const deleteUser = async () => {
    try {
      // getting response from server for delete user API
      const response = await axios.delete(
        `http://localhost:8000/user/delete/`,
        {
          withCredentials: true, // for cookie
        }
      );

      console.log(response.data);

      // redirect to /login
      navigate("/login");

      // showing message to user
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-4/5 flex flex-col m-auto items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">@{fetchedUser?.username}</h1>

      <p className="text-slate-500 mb-5">
        {/* Joined MyBlog on {dayjs(user.createdAt).format("DD MMM YYYY")} */}
        Joined MyBlog on {dayjs(fetchedUser?.createdAt).format("DD MMM YYYY")}
      </p>

      <div className="w-full flex flex-col justify-center items-center mt-4">
        <Link
          to="/user/articles/"
          className="w-1/3 text-center shadow bg-emerald-500 hover:bg-emerald-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-5"
        >
          <p>Your articles</p>
        </Link>

        <Link
          to="/user/change-password"
          className="w-1/3 text-center shadow bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-5"
        >
          <p>Change Your Password</p>
        </Link>

        <Link
          onClick={logout}
          className="w-1/3 text-center shadow bg-stone-500 hover:bg-stone-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-5"
        >
          <p>Logout</p>
        </Link>

        <Link
          onClick={deleteUser}
          className="w-1/3 text-center shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-5"
        >
          <p>Delete Your Account</p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
