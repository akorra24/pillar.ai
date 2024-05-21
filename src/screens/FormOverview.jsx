import { useState } from "react";

const FormOverview = () => {
  const [formValues, setFormValues] = useState({
    field1: "Value 1",
    field2: "Value 2",
    field3: "Value 3",
  });

  const handleEdit = (field) => {
    // Implement your edit logic here
    console.log(`Editing ${field}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Overview</h1>
      {Object.entries(formValues).map(([field, value]) => (
        <div key={field} className="flex items-center mb-2">
          <span className="mr-2">{field}:</span>
          <span className="mr-2">{value}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleEdit(field)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormOverview;
