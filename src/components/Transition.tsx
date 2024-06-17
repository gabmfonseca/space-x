import { Variants, motion } from 'framer-motion';
import { ReactNode } from 'react';

const defaultVariants = {
  initial: {
    opacity: 0,
    y: '20px',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '20px',
  },
};

const transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

interface TransitionProps {
  children: ReactNode;
  variants?: Variants;
}

const Transition: React.FC<TransitionProps> = ({ children, variants }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={variants || defaultVariants}
    transition={transition}
  >
    {children}
  </motion.div>
);

export default Transition;
