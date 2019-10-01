import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './dialog';
import FeedbackForm, { FeedbackFormSkeleton } from './feedback-form';

const FeedbackDialog = ({ isOpen, onDismiss }) => (
  <>
    <Dialog title="Feedback" isOpen={isOpen} onDismiss={onDismiss}>
      <FeedbackForm />
    </Dialog>
    {/*
      Hidden skeleton version of the feedback form to help the Netlify bots as
      the real form (inside the dialog) is rendered on-demand
    */}
    <FeedbackFormSkeleton hidden />
  </>
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
