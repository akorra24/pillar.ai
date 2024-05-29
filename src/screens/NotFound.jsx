import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col h-[80%] w-[90%] md:w-[60%] bg-black bg-opacity-75 rounded-3xl text-white justify-center items-center">
        <h1 className="text-5xl font-bold mt-10">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-4">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-10 bg-green-500 text-white py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
