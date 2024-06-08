function IconButton({
  onClick,
  icon,
  text,
  textColor = "text-white",
  backgroundColor = "bg-black",
  minWidth = "min-w-28",
}) {
  return (
    <button
      onClick={onClick}
      className={`text-center rounded-xl flex flex-row items-center justify-around px-2 ${backgroundColor} ${textColor} ${minWidth} p-2 mx-1`}
    >
      <img src={icon} className="w-3 mr-2" alt="icon" />
      {text}
    </button>
  );
}

export default IconButton;
