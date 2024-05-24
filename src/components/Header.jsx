const Header = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center absolute top-0 mt-2">
        <img
          src="/logo.png"
          alt="logo"
          className="w-40 cursor-pointer"
          onClick={() => window.location.reload()}
        />
        :
        {/* <button className="px-3 py-1 rounded-full text-black bg-transparent border border-black border-solid hover:bg-black hover:text-white focus:outline-none md:px-6 md:py-2">
          Log Out
        </button> */}
      </div>
    </div>
  );
};

export default Header;
