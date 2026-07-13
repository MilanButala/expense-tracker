import PropTypes from "prop-types";
import { formatCurrency } from "../utils/helper";

const InputField = ({
  label,
  id,
  type = "text",
  placeholder = "",
  register,
  validation = {},
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (<label htmlFor={id} className="text-sm font-bold text-text-primary" > {label} {required && <span className="text-danger">*</span>} </label>)}
      <div className="relative">
        {type === "number" && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            ₹
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
      w-full rounded-lg border py-2.5 outline-none
      ${type === "number" ? "pl-8 pr-4" : "px-4"}
      ${error
              ? "border-danger"
              : "border-border focus:border-primary"
            }
      ${className}
    `}
          {...(register ? register(id, validation) : {})}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  validation: PropTypes.object,
  error: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default InputField;