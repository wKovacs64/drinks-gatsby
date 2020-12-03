import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FaGithub } from 'react-icons/fa';
import { constrainWidth, focus } from '../styles';
import { mq } from '../utils';

function Footer({ onFeedbackClick }) {
  return (
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
            &:hover,
            &:focus {
              color: #f4f4f4;
              border-color: #f4f4f4;
            }
            ${focus};
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
            &:hover,
            &:focus {
              color: #f4f4f4;
            }
            ${focus};
          `}
          href="https://github.com/wKovacs64/drinks"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FaGithub aria-label="View source on GitHub" size={32} />
        </a>
      </section>
    </footer>
  );
}

Footer.propTypes = {
  onFeedbackClick: PropTypes.func,
};

Footer.defaultProps = {
  onFeedbackClick: () => {},
};

export default Footer;
