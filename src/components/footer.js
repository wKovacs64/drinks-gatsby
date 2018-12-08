import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { FaGithub } from 'react-icons/fa';
import constrainWidth from '../styles/constrain-width';
import mq from '../utils/mq';

const Footer = ({ onFeedbackClick }) => (
  <footer
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #cccccc;
      background-color: #111111;
      padding: 1rem;
      ${mq.md} {
        padding: 2rem;
      }
    `}
  >
    <section
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        ${constrainWidth};
      `}
    >
      <button
        type="button"
        onClick={onFeedbackClick}
        css={css`
          display: inline-block;
          color: currentColor;
          background-color: transparent;
          border: 1px solid currentColor;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.5rem;
          white-space: nowrap;
          transition: 0.3s ease;
          transition-property: color, border-color;
          &:hover,
          &:focus {
            color: #f4f4f4;
            border-color: #f4f4f4;
          }
          ${mq.md} {
            padding: 1rem;
          }
        `}
      >
        Send Feedback
      </button>
      <a
        css={css`
          color: currentColor;
          text-decoration: none;
          transition: color 0.3s ease;
          &:hover,
          &:focus {
            color: #f4f4f4;
          }
        `}
        href="https://github.com/wKovacs64/drinks"
        rel="noopener noreferrer"
      >
        <FaGithub aria-label="View source on GitHub" size={32} />
      </a>
    </section>
  </footer>
);

Footer.propTypes = {
  onFeedbackClick: PropTypes.func,
};

Footer.defaultProps = {
  onFeedbackClick: () => {},
};

export default Footer;
