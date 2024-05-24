function IconButton({
  onClick,
  icon,
  text,
  textColor = "text-white",
  backgroundColor = "bg-black",
}) {
  return (
    <button
      onClick={onClick}
      className={`text-center rounded-xl flex flex-row items-center px-2 ${backgroundColor} ${textColor}`}
    >
      <img src={icon} className="w-3 mr-2" alt="icon" />
      {text}
    </button>
  );
}

export default IconButton;
