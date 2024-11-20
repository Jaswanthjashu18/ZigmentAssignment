import React, { useState } from 'react';
import DynamicForm from './DynamicForm';
import JsonEditor from './JSON';

const App = () => {
  const [schema, setSchema] = useState({
    formTitle: "Example Form",
    formDescription: "Fill out the form below.",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
    ],
  });

  const handleSchemaChange = (newSchema) => {
    setSchema(newSchema);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-1/2 p-4">
        <JsonEditor schema={schema} onSchemaChange={handleSchemaChange} />
      </div>

      <div className="w-full lg:w-1/2 p-4">
        <DynamicForm schema={schema} />
      </div>
    </div>
  );
};

export default App;
