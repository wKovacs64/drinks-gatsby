import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { Dialog } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/dialog/styles.css';
import mq from '../utils/mq';

class FeedbackDialog extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onDismiss: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    onDismiss: () => {},
  };

  state = {};

  render() {
    const { isOpen, onDismiss } = this.props;

    return (
      <Dialog
        role="dialog"
        isOpen={isOpen}
        onDismiss={onDismiss}
        className={css`
          color: #6d372a;
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
            <span aria-hidden>x</span>
          </button>
        </section>
        <form
          className={css`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 2rem;
          `}
        >
          <input
            type="text"
            id="feedback-name"
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
            type="email"
            id="feedback-email"
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
            id="feedback-message"
            name="message"
            placeholder="What's up? (required)"
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
  }
}

export default FeedbackDialog;
