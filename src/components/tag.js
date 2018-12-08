import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import mq from '../utils/mq';

const Tag = ({ children, ...props }) => (
  <div
    css={css`
      min-width: 4rem;
      padding: 0.5rem;
      text-align: center;
      text-transform: lowercase;
      font-size: 0.875rem;
      font-weight: 400;
      ${mq.lg} {
        font-size: 1rem;
        font-weight: 300;
      }
    `}
    {...props}
  >
    {children}
  </div>
);

Tag.propTypes = {
  children: PropTypes.string,
};

Tag.defaultProps = {
  children: '',
};

export default Tag;
