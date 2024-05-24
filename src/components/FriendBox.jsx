const FriendBox = ({ text }) => {
  return (
    <p
      className="border-2 border-white text-center rounded-lg p-2 m-1 "
      style={{ boxShadow: "-4px 4px 1px rgba(255, 255, 255, 1)" }}
    >
      {text}
    </p>
  );
};

export default FriendBox;
