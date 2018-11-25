import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import VisuallyHidden from '@reach/visually-hidden';
import CloseIcon from './close-icon';
import mq from '../utils/mq';

const FeedbackDialog = ({ isOpen, onDismiss }) => (
  <Dialog
    role="dialog"
    isOpen={isOpen}
    onDismiss={onDismiss}
    className={css`
      color: #6d372a;
      max-width: 50rem;
      width: 100vw;
      ${mq.md(css`
        width: 75vw;
      `)};
      ${mq.lg(css`
        width: 50vw;
      `)};
    `}
  >
    <section
      className={css`
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
      `}
    >
      <h3
        className={css`
          margin: 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 1.25rem;
        `}
      >
        Feedback
      </h3>
      <button
        type="button"
        className={css`
          background-color: transparent;
          border-style: none;
          cursor: pointer;
          font-weight: 400;
          font-size: 1.25rem;
        `}
        onClick={onDismiss}
      >
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>
          <CloseIcon
            className={css`
              color: #6d372a;
            `}
          />
        </span>
      </button>
    </section>
    <form
      data-netlify="true"
      data-netlify-honeypot="terminator"
      action="/feedback-sent/"
      name="drinks-feedback"
      method="post"
      className={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2rem;
      `}
    >
      <input type="hidden" name="form-name" value="drinks-feedback" />
      <div hidden>
        <input
          type="text"
          name="terminator"
          aria-label="Are you the Terminator?"
        />
      </div>
      <input
        required
        type="text"
        name="name"
        placeholder="Name"
        aria-label="Name"
        className={css`
          border: 2px solid rgba(0, 0, 0, 0.3);
          height: 4rem;
          padding: 1rem;
          grid-column: span 2;
          ${mq.sm(css`
            grid-column: span 1;
          `)}
        `}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        className={css`
          border: 2px solid rgba(0, 0, 0, 0.3);
          height: 4rem;
          padding: 1rem;
          grid-column: span 2;
          ${mq.sm(css`
            grid-column: span 1;
          `)}
        `}
      />
      <textarea
        required
        name="message"
        placeholder="What's up?"
        aria-label="Message"
        rows={5}
        className={css`
          border: 2px solid rgba(0, 0, 0, 0.3);
          padding: 1rem;
          grid-column: span 2;
        `}
      />
      <button
        type="submit"
        className={css`
          grid-column: span 2;
          height: 4rem;
          border-style: none;
          cursor: pointer;
          color: #eedebf;
          background-color: #6d372a;
          transition: color 0.3s ease, background-color 0.3s ease;
          &:hover,
          &:focus {
            color: #6d372a;
            background-color: #eedebf;
          }
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 1rem;
          ${mq.lg(css`
            font-size: 1.25rem;
          `)};
        `}
      >
        Send
      </button>
    </form>
  </Dialog>
);

FeedbackDialog.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func,
};

FeedbackDialog.defaultProps = {
  isOpen: false,
  onDismiss: () => {},
};

export default FeedbackDialog;
