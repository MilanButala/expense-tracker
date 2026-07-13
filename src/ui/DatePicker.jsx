import PropTypes from "prop-types";

const DatePicker = ({
  label,
  id,
  register,
  validation = {},
  error,
  required = false,
  className = "",
  min,
  max,
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
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <input
        id={id}
        type="date"
        min={min}
        max={max}
        className={`
          w-full rounded-lg border
          border-border
          bg-background
          px-4 py-2.5
          text-text-primary
          outline-none
          transition
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
          ${error ? "border-danger focus:border-danger focus:ring-danger/20" : ""}
          ${className}
        `}
        {...(register ? register(id, validation) : {})}
        {...props}
      />

      {error && (
        <p className="text-sm text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  error: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
};

export default DatePicker;