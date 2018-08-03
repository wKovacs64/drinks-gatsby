import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Main = ({ className, children }) => (
  <main
    className={css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      ${mq.xl(css`
        align-items: center;
      `)};
      ${mq.md(css`
        padding: 1rem 0;
      `)};
      ${mq.xl(css`
        padding: 2rem;
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
