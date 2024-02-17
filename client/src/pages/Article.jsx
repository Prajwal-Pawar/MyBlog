import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comment, setComment] = useState("");
  const [articleComments, setArticleComments] = useState([]);

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
      setArticleComments(response.data.article.comments);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // getting article id from URL parameters
  const { slug } = useParams();

  useEffect(() => {
    getArticleById(slug);
  }, [slug]);

  // create comment
  const addComment = async (articleId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/comment/create`,
        {
          content: comment,
          article: articleId,
        },
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // showing message to user
      toast.success(response.data.message);

      // update articleComments to include the newly added comment
      setArticleComments((prevComments) => [
        ...prevComments,
        response.data.comment,
      ]);

      // clearing input fields
      setComment("");
    } catch (err) {
      console.log(err);
      // showing message to user
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container w-4/5 mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <h3 className="text-slate-500 mb-8">
          {article.user?.username} /{" "}
          {dayjs(article.createdAt).format("DD MMM YYYY")}
        </h3>

        <p className="mb-8 text-base text-left">{article.content}</p>

        <hr />

        {/* comment section */}
        <div className="mt-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {articleComments.length > 0 ? (
            <ul>
              {articleComments.map((articleComment, index) => (
                <li key={`comment-${index}`} className="mb-4">
                  <p className="font-semibold">
                    {articleComment.user?.username}
                  </p>
                  <p>{articleComment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Comments Yet</p>
          )}
        </div>

        {/* Comment Form */}

        <h2 className="text-xl font-bold mb-4">Add Comment</h2>
        <div className="mb-4">
          <textarea
            placeholder="Add Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full h-24"
            required
          />
        </div>
        <button
          onClick={() => addComment(article._id)}
          className="text-center shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-5"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Article;
