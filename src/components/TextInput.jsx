const TextInput = ({ label, placeholder, type = "text", value, setValue }) => {
  return (
    <div className="flex flex-col items-start justify-between p-4 w-full my-3">
      <label className="text-xl">{label}</label>
      <input
        type={type}
        className="w-full border-b-2 border-green-500 bg-transparent text-green-500 placeholder-green-800 focus:border-b-4 focus:outline-none text-2xl"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
