import PropTypes from "prop-types";

const Button = ({
  children,
  className = "",
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) => {
  const variants = {
    accent:
      "bg-accent-500 text-white hover:bg-accent-600 hover:shadow-accent-500/20",
    danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-red-500/20",
    ghost: "text-primary-700 hover:bg-primary-50",
    primary:
      "bg-primary-700 text-white hover:bg-primary-800 hover:shadow-primary-500/20",
    secondary:
      "border border-primary-200 bg-white text-primary-800 hover:bg-primary-50",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-sm transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["accent", "danger", "ghost", "primary", "secondary"]),
};

export default Button;
