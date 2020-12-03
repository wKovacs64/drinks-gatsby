import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { focus } from '../styles';

function NavLink(props) {
  return (
    <li
      css={css`
        display: inline;
      `}
    >
      <Link
        css={css`
          padding-bottom: 0.25rem;
          color: currentColor;
          text-decoration: none;
          border-bottom-style: dotted;
          border-bottom-width: 1px;
          &:hover,
          &:focus {
            border-bottom-style: solid;
          }
          ${focus};
        `}
        {...props}
      />
    </li>
  );
}

export default NavLink;
