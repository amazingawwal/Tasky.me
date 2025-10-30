import PropTypes from 'prop-types';

/**
 * Button component with different variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} - Button component
 */

export type ButtonType = {
  variant? : string,
  size? : string, 
  disabled? : boolean, 
  onClick? : ()=>void, 
  children? : any,
  type? : "submit" | "reset" | "button" | undefined,
  className? : string,
}

export type ClassVariantTypes = {
    primary: string,
    secondary: string,
    danger: string,
    success: string,
    warning: string,
}



const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  type = "submit",
  onClick , 
  children,
  className = '',
  ...rest 
}: ButtonType) => {
 
 const baseClasses = 'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
 const variantClasses: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    logo: 'bg-transparent text-blue-600 hover:text-blue-700 font-bold text-xl',
 };
  


 
 const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
 };
  
 const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
 const buttonClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${disabledClasses} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button; 