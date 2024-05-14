import Button from "./Button";

const Header = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <img src="/logo.png" alt="logo" className="w-10 md:w-20" />:
        <button className="px-3 py-1 rounded-full text-black bg-transparent border border-black border-solid hover:bg-black hover:text-white focus:outline-none md:px-6 md:py-2">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
