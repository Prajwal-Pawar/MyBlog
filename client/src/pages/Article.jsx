import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import {
  MdDelete,
  MdOutlineDateRange,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import formatNumber from "../utils/formatNumber";
import useAuth from "../hooks/useAuth";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comment, setComment] = useState("");
  const [articleComments, setArticleComments] = useState([]);

  // get user from context API
  const { user } = useAuth();

  // get article by id
  const getArticleBySlug = async (slug) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/article/${slug}`,
        {
          withCredentials: true, // for cookie
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
    getArticleBySlug(slug);
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
        { withCredentials: true } // for cookie
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

  // delete comment
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/comment/delete/${commentId}`,
        {
          withCredentials: true, // for cookie
        }
      );

      console.log(response.data);

      // showing message to user
      toast.success(response.data.message);

      // remove the deleted comments from articleComments state
      setArticleComments(
        articleComments.filter((comment) => comment._id !== commentId)
      );
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
        <h3 className="flex align-center text-slate-500 mb-8 mt-3">
          <FaRegUser size={20} className="mr-2" />
          <p className="mr-5">{article.user?.username}</p>
          <MdOutlineDateRange size={22} className="mr-2" />
          <p className="mr-5">
            {dayjs(article.createdAt).format("DD MMM YYYY")}
          </p>
          <MdOutlineRemoveRedEye size={22} className="mr-2" />
          <p className="mr-5">{formatNumber(article.views)}</p>
        </h3>

        <hr className="mb-5" />

        {/* <p className="mb-8 text-base text-left">{article.content}</p> */}

        {/* prose tailwind class is used for markdowns   */}
        {/* The @tailwindcss/typography plugin uses element modifiers to style child components of a container with the prose class.
        These modifiers follow the following general syntax:
        prose-[element]:class-to-apply
        For example, prose-h1:font-bold gives all <h1> tags the font-bold Tailwind class. */}
        {/* prose-p:-mb-1 prose-p:-mt-1 this classes are necessary for removing the
        p tag unnecessary padding and prose-a:text-blue-700 gives markdown links blue color */}
        <p className="mb-8 text-base text-left prose prose-p:-mb-1 prose-p:-mt-1 prose-a:text-blue-700">
          {/* this is for rendering markdown syntax articles */}
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </p>

        <hr />

        {/* comment section */}
        <div className="mt-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {articleComments.length > 0 ? (
            <ul>
              {articleComments.map((articleComment, index) => (
                <li
                  key={`comment-${index}`}
                  className="mb-4 p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-blue-800">
                        {articleComment.user?.username}
                      </p>
                      <p className="text-gray-600">{articleComment.content}</p>
                    </div>

                    {/* if current userId and user id in comment matches 
                    then show delete button */}
                    {user._id == articleComment.user._id ? (
                      <button
                        onClick={() => deleteComment(articleComment._id)}
                        className="mr-2 py-1 px-2 font-semibold rounded shadow bg-red-600 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
                      >
                        {/* icon */}
                        <MdDelete className="inline-block" size={20} />
                      </button>
                    ) : null}
                  </div>
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
