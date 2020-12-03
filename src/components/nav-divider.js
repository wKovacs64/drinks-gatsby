import React from 'react';
import { css } from '@emotion/react';

function NavDivider(props) {
  return (
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
}

export default NavDivider;
