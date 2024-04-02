import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import formatNumber from "../utils/formatNumber";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const location = useLocation();

  // get searchQuery from query from location.search
  const searchQuery = new URLSearchParams(location.search).get("query");

  // get all articles
  const fetchAllArticles = async () => {
    try {
      // getting response from server for fetch all article API
      const response = await axios.get(
        "http://localhost:8000/article/fetch-all",
        {
          withCredentials: true, // for cookie
          // query params
          params: {
            searchQuery, // send searchQuery as query param to the api
          },
        }
      );

      setArticles(response.data.articles);

      console.log(articles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, [location.search]);

  return (
    <div className="container w-4/5 px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Latest Articles</h1>

      <div className="flex flex-wrap -mx-4">
        {articles.map((article, index) => (
          <Link
            to={`/article/${article.slug}`}
            className="w-full sm:w-1/2 lg:w-1/2 px-4 mb-8"
            key={`article-${index}`}
          >
            <div className="border border-gray-300 rounded-lg p-6 transition duration-300 hover:shadow-md">
              <h1 className="text-xl font-bold mb-2 overflow-hidden overflow-ellipsis">
                {article.title}
              </h1>
              <h3 className="text-base text-slate-600 mb-3 overflow-hidden overflow-ellipsis">
                {article.description}
              </h3>

              <div className="flex items-center mb-3">
                <p className=" flex text-base text-slate-600">
                  <FaRegUser className="mr-3 mt-1" /> {article.user.username}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-base text-slate-600">
                  {dayjs(article.createdAt).format("DD MMM YYYY")}
                  {/* {dayjs(article.createdAt).format("DD MMMM YYYY")} */}
                </p>

                <div className="flex flex-row justify-center items-center">
                  <MdOutlineRemoveRedEye
                    size={22}
                    className="mr-2 text-slate-600"
                  />
                  <p className="text-slate-600">
                    {formatNumber(article.views)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
