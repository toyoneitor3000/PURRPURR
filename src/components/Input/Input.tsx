import React from 'react';
import classNames from 'classnames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  const baseStyles = 'block w-full px-spacing-4 py-spacing-2 text-text-primary border rounded-borderRadius-lg focus:outline-none transition-all duration-200 ease-in-out';
  const defaultStyles = 'border-border-default focus:border-interactive-primary focus:ring-1 focus:ring-interactive-primary';
  const errorStyles = 'border-error-base focus:border-error-base focus:ring-1 focus:ring-error-base';
  const disabledStyles = 'bg-neutral-light-gray-200 text-text-secondary cursor-not-allowed';
  
  const wrapperStyles = classNames('mb-spacing-4', { 'w-full': fullWidth });
  const labelStyles = 'block text-text-secondary text-fontSize-sm font-medium mb-spacing-1';
  const helperTextStyles = 'text-text-secondary text-fontSize-xs mt-spacing-1';
  const errorTextStyles = 'text-error-base text-fontSize-xs mt-spacing-1';
  const iconContainerStyles = 'absolute inset-y-0 flex items-center px-spacing-3 pointer-events-none';

  return (
    <div className={wrapperStyles}>
      {label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && <span className={classNames(iconContainerStyles, 'left-0')}>{leftIcon}</span>}
        <input
          id={inputId}
          className={classNames(
            baseStyles,
            error ? errorStyles : defaultStyles,
            { 'pl-spacing-10': leftIcon }, 
            { 'pr-spacing-10': rightIcon }, 
            { [disabledStyles]: props.disabled },
            className
          )}
          disabled={props.disabled}
          {...props}
        />
        {rightIcon && <span className={classNames(iconContainerStyles, 'right-0')}>{rightIcon}</span>}
      </div>
      {helperText && !error && <p className={helperTextStyles}>{helperText}</p>}
      {error && <p className={errorTextStyles}>{error}</p>}
    </div>
  );
};