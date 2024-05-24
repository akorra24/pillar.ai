import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebook, google } from "../firebase/firebase";
import { saveUserData } from "../services/saveLogin";
import FriendBox from "../components/FriendBox";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      saveUserData({
        uid: result.user.uid,
        email: result.user.email,
      });
      setUserData({
        uid: result.user.uid,
        email: result.user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error?.message
        ? error?.message.split("/")[1].split(")")[0].replace(/-/g, " ")
        : "An error occured";
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, google);
      saveUserData({
        uid: result.user.uid,
        email: result.user.email,
      });
      setUserData({
        uid: result.user.uid,
        email: result.user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error?.message
        ? error?.message.split("/")[1].split(")")[0].replace(/-/g, " ")
        : "An error occured";
      setError(errorMessage);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebook);
      saveUserData({
        uid: result.user.uid,
        email: result.user.email,
      });
      setUserData({
        uid: result.user.uid,
        email: result.user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error?.message
        ? error?.message.split("/")[1].split(")")[0].replace(/-/g, " ")
        : "An error occured";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row h-[80%] w-[90%] md:w-[60%] relative">
        <div className="flex flex-col items-start justify-between p-4 text-white bg-black opacity-0 md:opacity-100 bg-opacity-75 rounded-3xl w-full">
          <h3 className="text-3xl ml-10 mt-10 max-w-[50%]">
            Getting
            <br /> Started with Pillar.ai
          </h3>
          <div className="max-w-[50%]">
            <h2 className="p-5 text-3xl">Our Friends</h2>
            <div className="flex flex-row flex-wrap">
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
              <FriendBox text="Mike Tyson" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center text-white bg-black bg-opacity-80 rounded-3xl absolute right-0 h-full w-[100%] md:w-[50%]">
          <h3 className="ml-10 mb-10 text-2xl font-bold">Login</h3>
          <div className="flex flex-row justify-evenly items-center w-full">
            <button
              className="border-2 border-white text-center rounded-lg px-2 py-3 m-1 flex flex-row items-center"
              onClick={handleGoogleLogin}
            >
              <img src={GoogleIcon} className="w-5 mr-2" />
              Login with Google
            </button>
            <button
              className="border-2 border-white text-center rounded-lg px-2 py-3 m-1 flex flex-row items-center"
              onClick={handleFacebookLogin}
            >
              <img src={FacebookIcon} className="w-5 mr-2" />
              Login with Facebook
            </button>
          </div>
          <div className="flex flex-col items-center justify-center my-10">
            <p>-OR-</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Email"
              className="bg-white opacity-70 rounded-lg py-3 w-[90%] mb-5 pl-3 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-white opacity-70 rounded-lg py-3 w-[90%] mb-5 pl-3 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className=" bg-green-500 opacity-70 rounded py-3 w-[90%]"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="flex flex-row items-center justify-center mt-5">
            <p className="text-red-500">{error}</p>
          </div>
          <div className="flex flex-row items-center mt-10 ml-10">
            <p>Don't have an account?</p>
            <NavLink
              to="/sign-up"
              className="text-green-500 ml-2 cursor-pointer"
            >
              Sign up
            </NavLink>
          </div>
          <div className="flex flex-row items-center ml-10">
            <p>Forgot your password?</p>
            <p className="text-green-500 ml-2 cursor-pointer">Reset Password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
