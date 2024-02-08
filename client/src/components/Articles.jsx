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
    <div className="w-4/5 mt-8 flex flex-wrap m-auto">
      {articles.map((article, index) => (
        <Link
          to="/article/:id"
          className="w-full border mb-5 mr-4 p-5"
          key={`article-${index}`}
        >
          <div>
            <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
            <div className="flex justify-between">
              <h3 className="text-base text-slate-600">
                {article.description}
              </h3>
              <p className="text-base text-slate-600">
                {dayjs(article.createdAt).format("DD MMM YYYY")}
                {/* {dayjs(article.createdAt).format("DD MMMM YYYY")} */}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Articles;
