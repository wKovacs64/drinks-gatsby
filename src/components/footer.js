import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { FaGithub } from 'react-icons/fa';
import constrainWidth from '../styles/constrain-width';
import mq from '../utils/mq';

const Footer = ({ onFeedbackClick }) => (
  <Fragment>
    <footer
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #111111;
        padding: 1rem;
        ${mq.md(css`
          padding: 2rem;
        `)};
      `}
    >
      <section
        className={css`
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
          className={css`
            display: inline-block;
            color: #cccccc;
            background-color: transparent;
            border: 1px solid #cccccc;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.5rem;
            white-space: nowrap;
            transition: color 0.3s ease, border-color 0.3s ease;
            &:hover {
              color: #f4f4f4;
              border-color: #f4f4f4;
            }
            &:active {
              color: #cccccc;
              border-color: #cccccc;
            }
            ${mq.md(css`
              padding: 1rem;
            `)}
          `}
        >
          Send Feedback
        </button>
        <a
          className={css`
            color: #cccccc;
            text-decoration: none;
            transition: color 0.3s ease;
            &:hover {
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
    {/* Help for the Netlify bots as the real form is rendered on-demand */}
    <form
      data-netlify="true"
      data-netlify-honeypot="terminator"
      action="/feedback-sent/"
      name="drinks-feedback"
      hidden
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message" />
    </form>
  </Fragment>
);

Footer.propTypes = {
  onFeedbackClick: PropTypes.func,
};

Footer.defaultProps = {
  onFeedbackClick: () => {},
};

export default Footer;
