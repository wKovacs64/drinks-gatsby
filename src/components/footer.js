import React from 'react';
import { css } from 'react-emotion';

const Footer = () => (
  <footer
    className={css`
      background-color: #111111;
      color: #eeeeee;
      padding-top: 2rem;
      padding-right: 2rem;
      padding-left: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    `}
  >
    <span
      className={css`
        margin-bottom: 2rem;
      `}
    >
      Built with ♥ using: Gatsby, Contentful, and Emotion
    </span>
    <span
      className={css`
        color: #111111;
        margin-bottom: 2rem;

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
