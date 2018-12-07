import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import VisuallyHidden from '@reach/visually-hidden';
import CloseIcon from './close-icon';
import FeedbackForm, { FeedbackFormSkeleton } from './feedback-form';
import mq from '../utils/mq';

const FeedbackDialog = ({ isOpen, onDismiss }) => (
  <Fragment>
    <Dialog
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
          justify-content: space-between;
          margin-bottom: 2rem;
        `}
      >
        <h3
          css={css`
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
      <FeedbackForm />
    </Dialog>
    {/*
      Hidden skeleton version of the feedback form to help the Netlify bots as
      the real form (inside the dialog) is rendered on-demand
    */}
    <FeedbackFormSkeleton hidden />
  </Fragment>
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
