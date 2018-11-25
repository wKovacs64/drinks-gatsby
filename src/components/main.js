import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Main = ({ className, children }) => (
  <main
    className={css`
      flex: 1;
      padding: 1rem 0;
      ${mq.sm(css`
        align-self: center;
        padding: 2rem 0;
        width: 26rem;
      `)};
      ${mq.lg(css`
        width: 100%;
        max-width: 60rem;
      `)};
      ${mq.xl(css`
        max-width: 80rem;
      `)};
      ${className};
    `}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  className: '',
};

export default Main;
