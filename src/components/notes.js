import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { focus } from '../styles';
import { mq } from '../utils';

function Notes({ children }) {
  return (
    <div
      css={css`
        h1,
        h2,
        h3 {
          margin-top: 0;
          font-size: inherit;
        }
        h1 {
          font-weight: 400;
          ${mq.lg} {
            font-size: 1.5rem;
          }
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
          &:hover,
          &:focus {
            border-color: #a62304;
          }
          ${focus};
        }
        ul {
          list-style-type: square;
        }
        ul li {
          margin: 1.25rem 0;
        }
      `}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
}

Notes.propTypes = {
  children: PropTypes.string,
};

Notes.defaultProps = {
  children: '',
};

export default Notes;
