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
      width: 100vw;
      ${mq.sm(css`
        align-self: center;
        padding-bottom: 2rem;
        width: 26rem;
      `)};
      /* ${mq.md(css`
        width: 26rem;
      `)}; */
      ${mq.lg(css`
        /* align-self: stretch; */
        padding: 0 2rem 2rem;
        /* width: unset; */
        width: 100%;
        max-width: 60rem;
      `)};
      ${mq.xl(css`
        align-self: center;
        /* width: 90rem; */
        /* width: 100%; */
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
