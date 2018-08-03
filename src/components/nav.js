import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Nav = ({ children, className }) => (
  <nav
    className={css`
      color: #eeeeee;
      margin: 1rem;
      ${mq.md(css`
        margin: 1rem 2rem;
      `)};
      ${mq.xl(css`
        margin: 0;
        width: 70rem;
      `)};
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
