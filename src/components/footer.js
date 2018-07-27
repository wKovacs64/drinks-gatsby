import React from 'react';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';

const Footer = () => (
  <footer
    className={css`
      background-color: #111111;
      color: #eeeeee;
      padding-top: ${rhythm(1)};
      padding-right: ${rhythm(1)};
      padding-left: ${rhythm(1)};
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    `}
  >
    <span
      className={css`
        margin-bottom: ${rhythm(1)};
      `}
    >
      Built with ♥ using: Gatsby, Contentful, and Emotion
    </span>
    <span
      className={css`
        color: #111111;
        margin-bottom: ${rhythm(1)};

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
