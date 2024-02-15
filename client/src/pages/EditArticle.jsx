import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditArticle = () => {
  // hooks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // getting article id from URL parameters
  const { id } = useParams();

  const navigate = useNavigate();

  // get token from localstorage
  const token = localStorage.getItem("token");

  // get article by id
  const getArticleById = async (articleId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/article/id/${articleId}`,
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle(response.data.article.title);
      setDescription(response.data.article.description);
      setContent(response.data.article.content);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticleById(id);
  }, []);

  // edit article
  const editArticle = async (articleId) => {
    try {
      // getting response from server for edit article API
      const response = await axios.put(
        `http://localhost:8000/article/edit/${articleId}`,
        {
          title,
          description,
          content,
        },
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize edit article request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // redirect to /user/articles
      navigate("/user/articles/");

      // showing message to user
      toast.success(response.data.message);
    } catch (err) {
      console.log(err.response.data);
      // showing message to user
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mt-5 mb-8">Edit Article</h1>

      <div className="flex flex-col w-3/5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500 mb-2.5"
          required
        />
        <textarea
          placeholder="Description"
          cols="30"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500 mb-2.5"
          required
        />
        <textarea
          placeholder="Type here ..."
          cols="30"
          rows="15"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500 mb-2.5"
          required
        />
        <button
          onClick={() => editArticle(id)}
          className="shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-10"
        >
          Update Article
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
