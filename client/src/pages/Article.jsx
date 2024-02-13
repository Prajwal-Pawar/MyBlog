import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const Article = () => {
  const [article, setArticle] = useState({});

  // get token from localstorage
  const token = localStorage.getItem("token");

  // get article by id
  const getArticleById = async (slug) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/article/${slug}`,
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArticle(response.data.article);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // getting article id from URL parameters
  const { slug } = useParams();

  useEffect(() => {
    getArticleById(slug);
  }, []);

  return (
    <div className="w-4/5 flex flex-col m-auto items-center mt-5">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <h3 className="mt-2 text-slate-500">
        {article.user?.username} /{" "}
        {dayjs(article.createdAt).format("DD MMM YYYY")}
      </h3>

      <p className="mt-6 text-base text-left">{article.content}</p>
    </div>
  );
};

export default Article;
