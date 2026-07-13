import PropTypes from "prop-types";
import Logo from "../assets/expense-tracker.webp";

const BrandLogo = ({
  alt = "Expense Tracker",
  className = "",
  ...props
}) => {
  return (
    <img
      src={Logo}
      alt={alt}
      loading="lazy"
      className={className}
      {...props}
    />
  );
};

BrandLogo.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default BrandLogo;