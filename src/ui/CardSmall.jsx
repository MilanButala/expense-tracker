import PropTypes from "prop-types";

const CardSmall = ({
  children,
  title,
  className = "",
  bodyClassName = "",
}) => {
  return (
    <div className={`rounded-xl border border-border border-t-4 border-primary bg-card shadow-sm ${className}`}
    >
      {(title) && (
        <div className="px-6 pt-4 pb-2">
          {title && (
            <h4 className="text-base font-semibold text-secondary">
              {title}
            </h4>
          )}
        </div>
      )}

      <div className={`px-6 pb-4 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

CardSmall.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
};

export default CardSmall;