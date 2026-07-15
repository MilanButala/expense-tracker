import PropTypes from "prop-types";

const EmptyState = ({
  title = "No data found",
  message = "There is nothing to display right now.",
  action,
  icon = "true",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-base border border-dashed bg-surface px-6 py-8 text-center">
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h18M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2m-1 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7"
            />
          </svg>
        </div>
      )}

      <h3 className="text-xl font-semibold text-heading">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-body">
        {message}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.node,
};

export default EmptyState;
