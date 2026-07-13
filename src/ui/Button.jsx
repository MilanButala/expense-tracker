import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClass =
    "inline-flex items-center justify-center cursor-pointer rounded-lg font-medium transition-all duration-200";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-900",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    danger: "bg-danger text-white hover:bg-danger/90",
    link: "bg-transparent text-accent hover:text-accent/80 hover:underline shadow-none p-0",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    link: "text-sm",
  };

  const classes = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "danger",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default Button;