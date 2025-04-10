import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  onClick,
  animate = true,
  padding = true,
  hover = true,
  ...props
}) => {
  const MotionComponent = animate ? motion.div : 'div';
  
  return (
    <MotionComponent
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg
        ${padding ? 'p-6' : ''}
        ${hover ? 'transition-all duration-300 hover:shadow-xl' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  animate: PropTypes.bool,
  padding: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Card; 