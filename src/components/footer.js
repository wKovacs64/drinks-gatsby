import React from 'react';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Footer = () => (
  <footer
    className={css`
      background-color: #111111;
      color: #eeeeee;
      padding: 1rem;

      ${mq.md(css`
        padding: 2rem;
      `)};
    `}
  >
    <span>Built with ♥ using Gatsby, Contentful, and Emotion</span>
  </footer>
);

export default Footer;
