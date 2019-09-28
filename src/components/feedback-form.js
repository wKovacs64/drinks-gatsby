import React from 'react';
import { css, Global } from '@emotion/core';
import mq from '../utils/mq';

const FeedbackForm = () => (
  <>
    <Global
      // Remove Firefox styling of invalid form inputs
      styles={css`
        :not(output):-moz-ui-invalid,
        :not(output):-moz-ui-invalid:-moz-focusring {
          box-shadow: none;
        }
      `}
    />
    <form
      data-netlify="true"
      data-netlify-honeypot="terminator"
      action="/feedback-sent/"
      name="drinks-feedback"
      method="post"
      css={css`
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
        css={css`
          border: 2px solid rgba(0, 0, 0, 0.3);
          height: 4rem;
          padding: 1rem;
          grid-column: span 2;
          ${mq.sm} {
            grid-column: span 1;
          }
        `}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        css={css`
          border: 2px solid rgba(0, 0, 0, 0.3);
          height: 4rem;
          padding: 1rem;
          grid-column: span 2;
          ${mq.sm} {
            grid-column: span 1;
          }
        `}
      />
      <textarea
        required
        name="message"
        placeholder="What's up?"
        aria-label="Message"
        rows={
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(min-width: 992px)').matches
            ? 10
            : 5
        }
        css={css`
          border: 2px solid rgba(0, 0, 0, 0.3);
          padding: 1rem;
          grid-column: span 2;
        `}
      />
      <button
        type="submit"
        css={css`
          grid-column: span 2;
          height: 4rem;
          border-style: none;
          cursor: pointer;
          color: #eedebf;
          background-color: #6d372a;
          border: 1px solid transparent;
          transition: 0.3s ease;
          transition-property: color, background-color, border-color;
          &:hover,
          &:focus {
            color: #6d372a;
            background-color: #eedebf;
            border-color: currentColor;
          }
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 1rem;
          ${mq.lg} {
            font-size: 1.25rem;
          }
        `}
      >
        Send
      </button>
    </form>
  </>
);

// Skeleton version of the feedback form to help the Netlify bots as the real
// form (inside the dialog) is rendered on-demand
const FeedbackFormSkeleton = props => (
  <form
    data-netlify="true"
    data-netlify-honeypot="terminator"
    action="/feedback-sent/"
    name="drinks-feedback"
    {...props}
  >
    <input type="text" name="name" />
    <input type="email" name="email" />
    <textarea name="message" />
  </form>
);

export { FeedbackFormSkeleton };
export default FeedbackForm;
