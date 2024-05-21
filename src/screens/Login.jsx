const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row h-[80%] w-[60%] relative">
        <div className="flex flex-col items-start justify-between p-4 text-white bg-black opacity-75 rounded-3xl w-full">
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
        <div className="flex flex-col text-white bg-black opacity-100 rounded-3xl absolute right-0 h-full w-[50%]">
          <h3 className="ml-5">Login</h3>
          <div className="flex flex-row justify-center items-center w-full">
            <button className="border-2 border-white text-center rounded-lg p-2 m-1">
              Login with Google
            </button>
            <button className="border-2 border-white text-center rounded-lg p-2 m-1">
              Login with Facebook
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>-OR-</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Email"
              className="border-2 border-white text-center rounded-lg p-2 m-1"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-white text-center rounded-lg p-2 m-1"
            />
            <button className="border-2 border-white text-center rounded-lg p-2 m-1">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
