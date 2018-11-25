import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import constrainWidth from '../styles/constrain-width';
import mq from '../utils/mq';

const Main = ({ className, children }) => (
  <main
    className={css`
      flex: 1;
      padding: 1rem 0;
      ${mq.sm(css`
        align-self: center;
        padding: 2rem 0;
      `)};
      ${constrainWidth};
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
