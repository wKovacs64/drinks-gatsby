import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Main = ({ className, children }) => (
  <main
    className={css`
      /* border: 1px solid magenta; */
      display: block;
      box-sizing: border-box;
      flex: 1;
      align-self: center;
      ${mq.sm(css`
        padding: 0 0 2rem;
        width: 26rem;
      `)};
      ${mq.lg(css`
        padding: 0 2rem 2rem;
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
