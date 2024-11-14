import React from "react";

const Select = React.forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label htmlFor={props.id}>{label}</label>}
      <select
        ref={ref}
        name={props.name}
        id={props.id}
        {...props}
        className={`${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
