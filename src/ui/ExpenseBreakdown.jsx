import PropTypes from "prop-types";
import { formatCurrency } from "../utils/helper";

const ExpenseBreakdown = ({ data = [] }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <ul className="space-y-4">
      {data.map((item) => {

        const percentage = total ? ((item.amount / total) * 100).toFixed(1) : 0;

        return (
          <li
            key={item.id}
            className="flex items-center gap-4"
          >
            {/* Category */}
            <div className="flex w-32 md:w-44 items-center gap-2">
              <span
                className="h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: item.swatch }}
              />
              <span className="truncate font-medium">
                {item.label}
              </span>
            </div>

            {/* Progress */}
            <div className="flex-1">
              <div className="h-2.5 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.swatch,
                  }}
                />
              </div>
            </div>

            {/* Amount */}
            <div
              className="w-20 md:w-28 text-right font-semibold whitespace-nowrap"
              style={{ color: item.swatch }}
            >
              {formatCurrency(item.amount)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

ExpenseBreakdown.propTypes = {
  data: PropTypes.array,
};

export default ExpenseBreakdown;