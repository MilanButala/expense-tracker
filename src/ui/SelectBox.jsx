import PropTypes from "prop-types";

const SelectBox = ({
  label,
  id,
  register,
  validation = {},
  error,
  options = [],
  placeholder = "Select an option",
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-bold text-text-primary"
        >
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        id={id}
        className={`
          w-full rounded-lg border border-border
          bg-background px-4 py-2.5
          text-text-primary outline-none
          focus:border-primary focus:ring-2 focus:ring-primary/20
          ${error ? "border-danger" : ""}
          ${className}
        `}
        {...(register ? register(id, validation) : {})}
        {...props}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  register: PropTypes.func,
  validation: PropTypes.object,
  error: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectBox;