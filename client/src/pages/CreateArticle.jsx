import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateArticle = () => {
  // hooks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  // get token from localstorage
  const token = localStorage.getItem("token");

  // create article
  const createArticle = async (event) => {
    try {
      // prevent default behaviour of form submit
      event.preventDefault();

      console.log(token, "inside createarticle req");

      // getting response from server for create article API
      const response = await axios.post(
        "http://localhost:8000/article/create",
        {
          title,
          description,
          content,
        },
        {
          headers: {
            // sending authorization header to send JWT as bearer token to authorize create article request
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // redirect to /
      navigate("/");

      // showing message to user
      toast.success(response.data.message);

      // clearing input fields
      setTitle("");
      setDescription("");
      setContent("");
    } catch (err) {
      console.log(err.response.data);
      // showing message to user
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mt-5 mb-8">Create New Article</h1>

      <form className="flex flex-col w-3/5" onSubmit={createArticle}>
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
        <button className="shadow bg-emerald-500 hover:bg-emerald-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-10">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
