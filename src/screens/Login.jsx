import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row h-[80%] w-[90%] md:w-[60%] relative">
        <div className="flex flex-col items-start justify-between p-4 text-white bg-black opacity-0 md:opacity-75 rounded-3xl w-full">
          <h3>Getting Started with Pillar.ai</h3>
          <div className="max-w-[50%]">
            <h2 className="p-5">Our Friends</h2>
            <div className="flex flex-row flex-wrap">
              <p className="border-2 border-white text-center rounded-lg p-2 m-1 ">
                Mike tyson
              </p>
              <p className="border-2 border-white text-center rounded-lg p-2 m-1 ">
                Mike tyson
              </p>
              <p className="border-2 border-white text-center rounded-lg p-2 m-1 ">
                Mike tyson
              </p>
              <p className="border-2 border-white text-center rounded-lg p-2 m-1 ">
                Mike tyson
              </p>
              <p className="border-2 border-white text-center rounded-lg p-2 m-1 ">
                Mike tyson
              </p>
              <p className="border-2 border-white text-center rounded-lg p-2 m-1 ">
                Mike tyson
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center text-white bg-black opacity-80 rounded-3xl absolute right-0 h-full w-[100%] md:w-[50%]">
          <h3 className="ml-10 mb-10 text-2xl font-bold">Login</h3>
          <div className="flex flex-row justify-evenly items-center w-full">
            <button className="border-2 border-white text-center rounded-lg px-2 py-3 m-1 flex flex-row items-center">
              <img src={GoogleIcon} className="w-5 mr-2" />
              Login with Google
            </button>
            <button className="border-2 border-white text-center rounded-lg px-2 py-3 m-1 flex flex-row items-center">
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
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-white opacity-70 rounded-lg py-3 w-[90%] mb-5 pl-3 text-black"
            />
            <button className=" bg-green-500 opacity-70 rounded py-3 w-[90%]">
              Login
            </button>
          </div>
          <div className="flex flex-row items-center mt-10 ml-10">
            <p>Don't have an account?</p>
            <p className="text-green-500 ml-2 cursor-pointer">Sign up</p>
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
