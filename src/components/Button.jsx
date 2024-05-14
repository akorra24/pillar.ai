const Button = ({
  text,
  backgroundColor = "bg-green-500",
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-full text-white ${backgroundColor} focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
