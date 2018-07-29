import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Glass = ({ children, className }) => (
  <article
    className={css`
      color: #6d372a;
      border-color: #d09e45;
      border-width: 4px 0;
      ${mq.lg(css`
        border-width: 4px;
      `)};
      border-style: double;
      ${className};
    `}
  >
    {children}
  </article>
);

Glass.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Glass.defaultProps = {
  children: null,
  className: '',
};

export default Glass;
