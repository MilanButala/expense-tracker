import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { presetColors } from '../utils/constant'
const ThemeColor = ({
  label,
  name,
  control,
  rules = {},
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-bold text-text-primary">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="flex flex-wrap gap-3">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => field.onChange(color)}
                className={`
                  h-10 w-10 rounded-full border-2 transition-all duration-200
                  ${field.value === color
                    ? "border-primary scale-110 ring-2 ring-primary/30"
                    : "border-gray-300 hover:scale-105"
                  }
                `}
                style={{ backgroundColor: color }}
                aria-label={color}
              />
            ))}
          </div>
        )}
      />

      {error && (
        <p className="text-sm text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
};

ThemeColor.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
};

export default ThemeColor;