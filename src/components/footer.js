import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { FaGithub } from 'react-icons/fa';
import mq from '../utils/mq';

const FooterLink = styled.a`
  padding-bottom: 0.25rem;
  color: currentColor;
  text-decoration: none;
  border-bottom: 1px solid #cccccc;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    color: #f4f4f4;
    border-color: #f4f4f4;
    box-shadow: inset 0 -2px 0 0 #f4f4f4;
  }
`;

const Footer = ({ onFeedbackClick }) => (
  <Fragment>
    <footer
      className={css`
        display: grid;
        grid-gap: 2rem;
        grid-template-areas:
          'built-with built-with'
          'feedback view-source';
        align-items: center;
        justify-content: stretch;
        background-color: #111111;
        color: #cccccc;
        padding: 1rem;
        font-size: 1rem;
        ${mq.sm(css`
          justify-content: center;
          font-size: 1.25rem;
        `)};
        ${mq.md(css`
          padding: 2rem;
        `)};
      `}
    >
      <span
        className={css`
          grid-area: built-with;
        `}
      >
        Built with{' '}
        <span role="img" aria-label="booze">
          🥃
        </span>{' '}
        using{' '}
        <FooterLink href="https://www.gatsbyjs.org/" rel="noopener noreferrer">
          Gatsby
        </FooterLink>
        ,{' '}
        <FooterLink
          href="https://www.contentful.com/"
          rel="noopener noreferrer"
        >
          Contentful
        </FooterLink>
        , and{' '}
        <FooterLink href="https://emotion.sh/" rel="noopener noreferrer">
          Emotion
        </FooterLink>
      </span>
      <button
        type="button"
        onClick={onFeedbackClick}
        className={css`
          grid-area: feedback;
          justify-self: start;
          display: inline-block;
          color: currentColor;
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
            color: currentColor;
            border-color: #cccccc;
          }
          ${mq.sm(css`
            padding: 1rem;
          `)}
        `}
      >
        Send Feedback
      </button>
      <a
        className={css`
          grid-area: view-source;
          justify-self: end;
          color: currentColor;
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
