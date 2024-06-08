const FriendBox = ({ text, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 text-center rounded-lg p-2 m-1"
      style={{
        boxShadow: "-4px 4px 1px rgba(255, 255, 255, 0.3)", // less white shadow
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.8)', // less white text
        backgroundColor: 'rgba(255, 255, 255, .08)', // slight transparency
        borderColor: 'rgba(255, 255, 255, 0.3)', // less white border
        borderWidth: '2px',
      }}
    >
      {text}
    </a>
  );
 };
 
 
 export default FriendBox;