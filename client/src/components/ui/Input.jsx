const Input = ({ label, id, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

export default Input;
