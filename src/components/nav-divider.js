import React from 'react';
import { css } from '@emotion/core';

const NavDivider = (props) => (
  <span
    css={css`
      margin: 0 1rem;
    `}
    {...props}
    aria-hidden
  >
    ⇒
  </span>
);

export default NavDivider;
