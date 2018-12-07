import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';

const Nav = ({ children, ...props }) => (
  <nav
    css={css`
      color: #eeeeee;
      padding: 0 1rem;
      margin-bottom: 1rem;
      ${mq.sm} {
        padding: 0;
        margin-bottom: 2rem;
      }
    `}
    {...props}
  >
    {children}
  </nav>
);

Nav.propTypes = {
  children: PropTypes.node,
};

Nav.defaultProps = {
  children: null,
};

export default Nav;
