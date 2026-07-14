const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-400 px-4 py-2',
    ghost:   'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white px-4 py-2',
    danger:  'bg-red-600 hover:bg-red-700 text-white focus:ring-red-400 px-4 py-2',
    icon:    'bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white p-2 rounded-lg',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
