import { css } from '@emotion/core';

export default css`
  &:focus {
    transition: 0.1s ease;
    transition-property: color, background-color, border-color, box-shadow;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    outline: none;
  }
`;
