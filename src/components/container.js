import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Container = ({ className, children }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      ${mq.xl(css`
        align-items: center;
      `)};
      padding: 1rem 0;
      ${mq.lg(css`
        padding: 2rem;
      `)};
      ${className};
    `}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Container.defaultProps = {
  children: null,
  className: '',
};

export default Container;
