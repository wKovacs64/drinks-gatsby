import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Nav = ({ children, className }) => (
  <nav
    className={css`
      color: #eeeeee;
      /* border: 1px solid magenta; */
      padding: 1rem;
      ${mq.sm(css`
        padding: 2rem 0;
      `)};
      /* ${mq.md(css`
        padding: 2rem;
      `)}; */
      /* ${mq.xl(css`
        padding: 2rem 0;
      `)}; */
      ${className};
    `}
  >
    {children}
  </nav>
);

Nav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Nav.defaultProps = {
  children: null,
  className: '',
};

export default Nav;
