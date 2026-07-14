const VARIANTS = {
  default: 'bg-gray-700 text-gray-300',
  brand:   'bg-brand-600/20 text-brand-400 border border-brand-600/40',
  success: 'bg-green-600/20 text-green-400 border border-green-600/40',
  warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/40',
  danger:  'bg-red-600/20 text-red-400 border border-red-600/40',
};

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${VARIANTS[variant]} ${className}`}>
    {children}
  </span>
);

export default Badge;
