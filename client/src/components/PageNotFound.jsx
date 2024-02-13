import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-4/5 relative flex flex-col justify-center items-center mt-16 m-auto">
      <h1 className="text-4xl font-bold">404</h1>
      <h3 className="text-2xl font-bold">Page Not Found</h3>
      <p className="text-xl mb-10">
        Sorry, the page you are looking for doesnt exists.
      </p>
      <Link
        to="/"
        className="text-lg font-semibold hover:underline text-blue-700"
      >
        Return Back
      </Link>
    </div>
  );
};

export default PageNotFound;
