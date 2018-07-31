import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Notes = ({ children }) => (
  <div
    className={css`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 300;
        margin-top: 0;
      }
      h1,
      h2,
      h3 {
        font-size: 1.25rem;
        ${mq.lg(css`
          font-size: 1.5rem;
        `)};
      }
      h4 {
        font-size: 1rem;
        ${mq.lg(css`
          font-size: 1.25rem;
        `)};
      }
      h5 {
        font-size: 0.875rem;
        ${mq.lg(css`
          font-size: 1rem;
        `)};
      }
      h6 {
        font-size: 0.75rem;
        ${mq.lg(css`
          font-size: 0.875rem;
        `)};
      }
      a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 1px solid #d09e45;
        box-shadow: inset 0 -2px 0 0 #d09e45;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          border-color: #a62304;
          box-shadow: inset 0 -2px 0 0 #a62304;
        }
      }
    `}
    dangerouslySetInnerHTML={{
      __html: children,
    }}
  />
);

Notes.propTypes = {
  children: PropTypes.string,
};

Notes.defaultProps = {
  children: '',
};

export default Notes;
