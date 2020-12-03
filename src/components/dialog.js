import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Dialog as ReachDialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import VisuallyHidden from '@reach/visually-hidden';
import { MdClear } from 'react-icons/md';
import { focus } from '../styles';
import { mq } from '../utils';

function Dialog({
  'aria-label': ariaLabel,
  title,
  isOpen,
  onDismiss,
  children,
}) {
  return (
    <ReachDialog
      aria-label={ariaLabel}
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
          css={css`
            background-color: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            opacity: 0.8;
            &:hover,
            &:focus {
              opacity: 1;
            }
            ${focus};
          `}
          type="button"
          onClick={onDismiss}
        >
          <VisuallyHidden>Clear</VisuallyHidden>
          <MdClear color="#6d372a" aria-hidden size={32} />
        </button>
      </section>
      {children}
    </ReachDialog>
  );
}

Dialog.propTypes = {
  'aria-label': PropTypes.string.isRequired,
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
