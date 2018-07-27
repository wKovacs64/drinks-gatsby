import React from 'react';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';

const Footer = () => (
  <footer
    className={css`
      background-color: #111111;
      color: #eeeeee;
      padding: ${rhythm(1)};
      display: flex;
      justify-content: space-between;
    `}
  >
    <span>Built with ♥ using: Gatsby, Contentful, and Emotion</span>
    <span
      className={css`
        color: #111111;

        &:hover {
          color: #eeeeee;
        }

        transition: color 3s ease-in;
      `}
    >
      Special thanks to my liver.
    </span>
  </footer>
);

export default Footer;
