import { Link } from 'react-router-dom';

export const Icon = ({ iconName, text, to, className = '', disabled, ...props }) => {
  const styles = `inline-flex items-center justify-center
    transition-all duration-300 cursor-pointer
    text-main-text hover:text-accent
    hover:scale-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
    bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-accent
    ${className}
`;
  const icon = (
    <>
      <i className={`fa fa-${iconName}`} aria-hidden="true"></i>
      <span className="sr-only">{text}</span>
    </>
  );

  if (to && !disabled) {
    return (
      <Link className={styles} to={to} {...props}>
        {icon}
      </Link>
    );
  }

  return (
    <button className={styles} type="button" disabled={disabled} {...props}>
      {icon}
    </button>
  );
};
