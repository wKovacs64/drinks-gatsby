import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Dialog as ReachDialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import VisuallyHidden from '@reach/visually-hidden';
import CloseIcon from './close-icon';
import mq from '../utils/mq';

const Dialog = ({ title, isOpen, onDismiss, children }) => (
  <ReachDialog
    role="dialog"
    isOpen={isOpen}
    onDismiss={onDismiss}
    css={css`
      color: #6d372a;
      max-width: 50rem;
      width: 100vw;
      ${mq.md} {
        width: 75vw;
      }
      ${mq.lg} {
        width: 50vw;
      }
    `}
  >
    <section
      css={css`
        display: flex;
        justify-content: ${title ? 'space-between' : 'flex-end'};
        margin-bottom: 2rem;
      `}
    >
      {title && (
        <h3
          css={css`
            margin: 0;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-weight: 400;
            font-size: 1.25rem;
          `}
        >
          {title}
        </h3>
      )}
      <button
        type="button"
        css={css`
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
            css={css`
              color: #6d372a;
            `}
          />
        </span>
      </button>
    </section>
    {children}
  </ReachDialog>
);

Dialog.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func,
  children: PropTypes.node,
};

Dialog.defaultProps = {
  title: '',
  onDismiss: () => {},
  children: null,
};

export default Dialog;
