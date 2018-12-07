import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import constrainWidth from '../styles/constrain-width';
import mq from '../utils/mq';

const Main = ({ children, ...props }) => (
  <main
    css={css`
      flex: 1;
      padding: 1rem 0;
      ${mq.sm} {
        align-self: center;
        padding: 2rem 0;
      }
      ${constrainWidth};
    `}
    {...props}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node,
};

Main.defaultProps = {
  children: null,
};

export default Main;
