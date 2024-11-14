import React from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        type={type}
        className={`${className}`}
        id={props.id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
