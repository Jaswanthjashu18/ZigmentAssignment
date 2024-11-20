import React from 'react';
import { useForm } from 'react-hook-form';

const DynamicForm = ({ schema }) => {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm();

  const allowedDomains = ["google.com", "yahoo.com", "example.com","gmail.com"];

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
    reset(); 
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label className="font-medium mb-1">{field.label}</label>

            {field.type === "email" ? (
              <input
                type="email"
                {...register(field.id, {
                  required: field.required,
                  validate: (value) => {
                    const domain = value.split("@")[1];
                    if (!domain || !allowedDomains.includes(domain)) {
                      return `Only these domains are allowed: ${allowedDomains.join(", ")}`;
                    }
                    return true;
                  },
                })}
                placeholder={field.placeholder}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={field.type}
                {...register(field.id, { required: field.required })}
                placeholder={field.placeholder}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {errors[field.id] && (
              <p className="text-red-500 mt-1">{errors[field.id].message}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
