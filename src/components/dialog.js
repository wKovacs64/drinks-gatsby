import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dialog as ReachDialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import VisuallyHidden from '@reach/visually-hidden';
import { MdClear } from 'react-icons/md';

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
      className="!w-screen max-w-3xl text-maroon md:!w-[75vw] lg:!w-[50vw]"
    >
      <section
        className={clsx('mb-8 flex', title ? 'justify-between' : 'justify-end')}
      >
        {title && (
          <h3 className="text-xl uppercase tracking-widest">{title}</h3>
        )}
        <button
          className="opacity-80 transition ease-default hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring"
          type="button"
          onClick={onDismiss}
        >
          <VisuallyHidden>Clear</VisuallyHidden>
          <MdClear aria-hidden size={32} />
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
