import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Nav = ({ children, className }) => (
  <nav
    className={css`
      color: #eeeeee;
      padding: 0 1rem;
      margin-bottom: 1rem;
      ${mq.sm(css`
        padding: 0;
        margin-bottom: 2rem;
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
