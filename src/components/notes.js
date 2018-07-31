import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Notes = ({ children }) => (
  <div
    className={css`
      h1,
      h2,
      h3 {
        margin-top: 0;
        font-size: inherit;
      }
      h1 {
        font-weight: 400;
        ${mq.lg(css`
          font-size: 1.5rem;
        `)};
      }
      h2 {
        font-weight: 400;
      }
      h3 {
        font-weight: 300;
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
