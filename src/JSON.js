import React, { useState } from 'react';

const JsonEditor = ({ schema, onSchemaChange }) => {
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const newValue = event.target.value;
    try {
      const parsedSchema = JSON.parse(newValue);
      setError(null);
      onSchemaChange(parsedSchema);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">JSON Editor</h2>
      <textarea
        className="w-full h-96 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={JSON.stringify(schema, null, 2)}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JsonEditor;
  