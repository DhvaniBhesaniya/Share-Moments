import PropTypes from 'prop-types';

const variants = {
  h1: 'text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl',
  h2: 'text-3xl font-bold tracking-tight sm:text-4xl',
  h3: 'text-2xl font-bold tracking-tight sm:text-3xl',
  h4: 'text-xl font-bold tracking-tight sm:text-2xl',
  subtitle: 'text-xl text-gray-600 dark:text-gray-400',
  body: 'text-base text-gray-600 dark:text-gray-400',
  small: 'text-sm text-gray-500 dark:text-gray-500',
};

const Text = ({
  variant = 'body',
  as: Component = 'p',
  className = '',
  children,
  ...props
}) => {
  return (
    <Component
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text; 