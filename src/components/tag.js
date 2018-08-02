import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Tag = ({ children, className }) => (
  <div
    className={css`
      min-width: 4rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      text-align: center;
      text-transform: lowercase;
      font-size: 0.875rem;
      ${mq.lg(css`
        font-size: 1rem;
      `)};
      font-weight: 400;
      ${mq.lg(css`
        font-weight: 300;
      `)};
      color: #d09e45;
      background-color: #6d372a;
      transition: color 0.3s ease, background-color 0.3s ease;

      &:hover {
        color: #6d372a;
        background-color: #d09e45;
      }
      ${className};
    `}
  >
    {children}
  </div>
);

Tag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

Tag.defaultProps = {
  children: '',
  className: '',
};

export default Tag;
