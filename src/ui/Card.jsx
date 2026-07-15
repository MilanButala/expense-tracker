import PropTypes from "prop-types";

const Card = ({
  children,
  title,
  subTitle,
  className = "",
  bodyClassName = "",
}) => {
  return (
    <div className={`rounded-xl bg-card dark:shadow-dark-sm shadow-sm !border-none dark:!border-none ${className}`}
    >
      {(title || subTitle) && (
        <div className="border-b border-border px-6 py-4">
          {title && (
            <h2 className="text-xl font-semibold text-secondary">
              {title}
            </h2>
          )}

          {subTitle && (
            <p className="mt-1 text-sm text-text-secondary">
              {subTitle}
            </p>
          )}
        </div>
      )}

      <div className={`p-6 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
};

export default Card;