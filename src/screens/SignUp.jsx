import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, facebook, google } from "../firebase/firebase";
import { saveUserData } from "../services/saveLogin";
import FriendBox from "../components/FriendBox";

const SignUp = ({ setUserData }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(0);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
        : "An error occurred";
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
        : "An error occurred";
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
        : "An error occurred";
      setError(errorMessage);
    }
  };

  const handleForgotPasswordPopup = () => {
    setForgotPasswordPopup(1);
  };

  const handleSendForgotEmail = async () => {
    try {
      if (forgotEmail) {
        await sendPasswordResetEmail(auth, forgotEmail);
        setForgotPasswordPopup(2);
      } else {
        setForgotPasswordPopup(3);
      }
    } catch (error) {
      console.error("Failed to send forgot password email:", error);
      setForgotPasswordPopup(3);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row h-[80%] w-[95%] 2xl:w-[60%] relative">
        <div className="flex flex-col items-start justify-between p-4 text-white bg-black opacity-0 md:opacity-100 bg-opacity-75 rounded-3xl w-full">
          <h3 className="text-3xl ml-10 mt-10 max-w-[50%]">
            Getting
            <br /> Started with Pillar.ai
          </h3>
          <div className="max-w-[50%]">
            <h2 className="p-5 text-3xl">Our Friends</h2>
            <div className="flex flex-row flex-wrap">
              <FriendBox
                text="Mike Tyson"
                url="https://en.wikipedia.org/wiki/Mike_Tyson"
              />
              <FriendBox
                text="NFL"
                url="https://en.wikipedia.org/wiki/National_Football_League"
              />
              <FriendBox
                text="Cheech & Chong"
                url="https://en.wikipedia.org/wiki/Cheech_%26_Chong"
              />
              <FriendBox
                text="Julianna Peña"
                url="https://en.wikipedia.org/wiki/Julianna_Pe%C3%B1a"
              />
              <FriendBox
                text="Tyson 2.0"
                url="https://en.wikipedia.org/wiki/Tyson_Ranch"
              />
              <FriendBox
                text="Jim Gray"
                url="https://en.wikipedia.org/wiki/Jim_Gray_(sportscaster)"
              />
              <FriendBox
                text="Ric Flair"
                url="https://en.wikipedia.org/wiki/Ric_Flair"
              />
              <FriendBox
                text="Sommer Ray"
                url="https://en.wikipedia.org/wiki/Sommer_Ray"
              />
              <FriendBox
                text="Whoop"
                url="https://en.wikipedia.org/wiki/Whoop"
              />
              <FriendBox
                text="Fantasy Footballers"
                url="https://en.wikipedia.org/wiki/Fantasy_football"
              />
              <FriendBox
                text="Hotboxin Podcast"
                url="https://en.wikipedia.org/wiki/Hotboxin%27_with_Mike_Tyson"
              />
              <FriendBox
                text="Illmind"
                url="https://en.wikipedia.org/wiki/Illmind"
              />
              <FriendBox
                text="CJ Anderson"
                url="https://en.wikipedia.org/wiki/C._J._Anderson"
              />
              <FriendBox
                text="Alexis Texas"
                url="https://en.wikipedia.org/wiki/Alexis_Texas"
              />
              <FriendBox
                text="Shawn Johnson"
                url="https://en.wikipedia.org/wiki/Shawn_Johnson"
              />
              <FriendBox
                text="Wayne Brady"
                url="https://en.wikipedia.org/wiki/Wayne_Brady"
              />
              <FriendBox
                text="Juju Smith Schuster"
                url="https://en.wikipedia.org/wiki/Juju_Smith-Schuster"
              />
              <FriendBox
                text="Bow Wow"
                url="https://en.wikipedia.org/wiki/Bow_Wow_(rapper)"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center text-white bg-black bg-opacity-80 rounded-3xl absolute right-0 h-full w-[100%] md:w-[50%]">
          <h3 className="ml-10 mb-10 text-2xl font-bold">Sign Up</h3>
          <div className="flex flex-row justify-evenly items-center w-full">
            <button
              className="border-2 border-white text-center rounded-lg px-2 py-3 m-1 flex flex-row items-center"
              onClick={handleGoogleLogin}
            >
              <img src={GoogleIcon} className="w-5 mr-2" />
              Sign Up with Google
            </button>
            <button
              className="border-2 border-white text-center rounded-lg px-2 py-3 m-1 flex flex-row items-center"
              onClick={handleFacebookLogin}
            >
              <img src={FacebookIcon} className="w-5 mr-2" />
              Sign Up with Facebook
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
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-row items-center justify-center mt-5">
            <p className="text-red-500">{error}</p>
          </div>
          <div className="flex flex-row items-center mt-10 ml-10">
            <p>Don&apos;t have an account?</p>
            <NavLink to="/login" className="text-green-500 ml-2 cursor-pointer">
              Login
            </NavLink>
          </div>
          <div className="flex flex-row items-center ml-10">
            <p>Forgot your password?</p>
            <p
              className="text-green-500 ml-2 cursor-pointer"
              onClick={handleForgotPasswordPopup}
            >
              Reset Password
            </p>
          </div>
        </div>
      </div>
      {forgotPasswordPopup > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-5 rounded-lg">
            <h3 className="text-2xl font-bold mb-5 text-green-500">
              Forgot Password
            </h3>
            {forgotPasswordPopup === 1 && (
              <>
                <p className="text-green-500 mb-2">
                  Please enter your email address to reset your password.
                </p>
                <input
                  type="email"
                  className="w-full border-b-2 border-green-500 bg-transparent text-green-500 placeholder-green-800 focus:border-b-4 focus:outline-none text-2xl"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  className="border-2 border-green-500 text-white bg-green-500 px-4 py-2 rounded-lg mt-5"
                  onClick={handleSendForgotEmail}
                >
                  Send Reset Link
                </button>
              </>
            )}
            {forgotPasswordPopup === 2 && (
              <p className="text-green-500">
                A password reset link has been sent to your email successfully.
              </p>
            )}
            {forgotPasswordPopup === 3 && (
              <p className="text-red-500">
                Failed to send the password reset link. Please try again.
              </p>
            )}
            <div className="flex justify-end mt-5">
              <button
                className="border-2 border-green-500 text-green-500 px-4 py-2 rounded-lg"
                onClick={() => setForgotPasswordPopup(0)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
