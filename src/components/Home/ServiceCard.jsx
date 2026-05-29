import PropTypes from "prop-types";
import { ArrowRight } from "lucide-react";

const colorMap = {
  accent: "bg-accent-500 text-white group-hover:border-accent-200",
  primary: "bg-primary-700 text-white group-hover:border-primary-200",
  success: "bg-emerald-600 text-white group-hover:border-emerald-200",
};

const ServiceCard = ({ description, href, icon, onClick, title, tone }) => {
  const content = (
    <div className="group h-full rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">
      <div className="flex h-full flex-col gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorMap[tone]}`}
        >
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm leading-6 text-neutral-600">{description}</p>
        </div>
        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary-700 transition-transform group-hover:translate-x-1">
          <span>Buka layanan</span>
          <ArrowRight size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button className="h-full text-left focus-ring" onClick={onClick} type="button">
        {content}
      </button>
    );
  }

  return (
    <a className="h-full focus-ring" href={href}>
      {content}
    </a>
  );
};

ServiceCard.propTypes = {
  description: PropTypes.string.isRequired,
  href: PropTypes.string,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  tone: PropTypes.oneOf(["accent", "primary", "success"]),
};

ServiceCard.defaultProps = {
  href: "/comingsoon",
  onClick: null,
  tone: "primary",
};

export default ServiceCard;
