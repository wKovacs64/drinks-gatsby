import React from 'react';
import { TransitionState } from 'gatsby-plugin-transition-link';
import { motion } from 'framer-motion';

const AnimateOnTransition = props => (
  <TransitionState>
    {({ transitionStatus }) => (
      <motion.div
        initial={false}
        animate={transitionStatus}
        variants={{
          entering: { opacity: 1 },
          entered: { opacity: 1 },
          exiting: { opacity: 0 },
          exited: { opacity: 0 },
        }}
        {...props}
      />
    )}
  </TransitionState>
);

export default AnimateOnTransition;
