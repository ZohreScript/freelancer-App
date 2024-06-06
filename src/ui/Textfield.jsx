import React from "react";

function Textfield({
  label,
  name,
  register,
  validationSchema = {},
  type = "text",
  required,
  errors,
}) {
  return (
    <div>
      <label
        label="شماره موبایل"
        className="mb-2 block text-secondary-700"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <input
        {...register(name, validationSchema)}
        type={type}
        id={name}
        className="textField__input"
        autoComplete="off"
      />
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default Textfield;
