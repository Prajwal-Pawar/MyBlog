import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { MdDelete, MdEdit } from "react-icons/md";

const UserArticles = () => {
  const [userArticles, setUserArticles] = useState([]);

  // get token from localstorage
  const token = localStorage.getItem("token");

  // get user articles
  const fetchUserArticles = async () => {
    try {
      // getting response from server for fetch all article API
      const response = await axios.get("http://localhost:8000/user/articles", {
        headers: {
          // sending authorization header to send JWT as bearer token to authorize request
          Authorization: `Bearer ${token}`,
        },
      });

      setUserArticles(response.data.articles);

      console.log(userArticles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, []);

  return (
    <div className="container w-4/5 mt-8 mx-auto">
      <h1 className="text-lg mb-4 m-auto">
        You published <span className="font-bold">{userArticles.length}</span>{" "}
        articles till now.
      </h1>

      <div className="flex flex-wrap -mx-4">
        {userArticles.map((article, index) => (
          <div
            key={`article-${index}`}
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4"
          >
            <div className="border p-4 rounded-md">
              <Link to={`/article/${article.slug}`}>
                <h2 className="text-lg font-semibold mb-2 overflow-hidden overflow-ellipsis">
                  {article.title}
                </h2>
              </Link>

              <p className="text-sm text-slate-600 mb-2 overflow-hidden overflow-ellipsis">
                {article.description}
              </p>

              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600">
                  {dayjs(article.createdAt).format("DD MMM YYYY")}
                </p>

                <div>
                  <Link to={`/article/edit/${article._id}`}>
                    <button className="mr-2 py-1 px-2 font-semibold rounded shadow bg-indigo-600 hover:bg-indigo-500 text-white focus:shadow-outline focus:outline-none">
                      {/* icon */}
                      <MdEdit className="inline-block mr-1" size={20} />
                      Edit
                    </button>
                  </Link>
                  <Link>
                    <button className="mr-2 py-1 px-2 font-semibold rounded shadow bg-red-600 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none">
                      {/* icon */}
                      <MdDelete className="inline-block mr-1" size={20} />
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserArticles;
