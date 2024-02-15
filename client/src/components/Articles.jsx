import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  // get token from localstorage
  const token = localStorage.getItem("token");

  // get all articles
  const fetchAllArticles = async () => {
    try {
      // getting response from server for fetch all article API
      const response = await axios.get(
        "http://localhost:8000/article/fetch-all",
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize request
            Authorization: `Bearer ${token}`,
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
  }, []);

  return (
    <div className="container w-4/5 px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Latest Articles</h1>

      <div className="flex flex-wrap justify-center -mx-4">
        {articles.map((article, index) => (
          <Link
            to={`/article/${article.slug}`}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
            key={`article-${index}`}
          >
            <div className="border border-gray-200 rounded-lg p-6 transition duration-300 hover:shadow-md">
              <h1 className="text-xl font-bold mb-2 overflow-hidden overflow-ellipsis">
                {article.title}
              </h1>
              <h3 className="text-base text-slate-600 mb-4 overflow-hidden overflow-ellipsis">
                {article.description}
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-base text-slate-600">
                  {dayjs(article.createdAt).format("DD MMM YYYY")}
                  {/* {dayjs(article.createdAt).format("DD MMMM YYYY")} */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
