import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { mq } from '../utils';

function Glass({ children, ...props }) {
  return (
    <article
      css={css`
        color: #6d372a;
        border-color: #d09e45;
        border-width: 4px 0;
        border-style: double;
        ${mq.sm} {
          border-width: 4px;
        }
      `}
      {...props}
    >
      {children}
    </article>
  );
}

Glass.propTypes = {
  children: PropTypes.node,
};

Glass.defaultProps = {
  children: null,
};

export default Glass;
