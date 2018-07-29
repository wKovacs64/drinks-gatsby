import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const DrinkDetails = ({ className, drink }) => (
  <section
    className={css`
      background-color: #eeeeee;
      padding: 0 2rem 2rem 2rem;
      ${mq.md(css`
        padding: 2rem;
      `)};
      font-size: 1rem;
      ${mq.lg(css`
        font-size: 1.25rem;
      `)};
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
      ${className};
    `}
  >
    {drink.notes && (
      <div
        dangerouslySetInnerHTML={{
          __html: drink.notes.childMarkdownRemark.html,
        }}
      />
    )}
    {drink.tags && (
      <div>
        Tags:{' '}
        {drink.tags.map(tag => (
          <span key={tag}>{tag} </span>
        ))}
      </div>
    )}
  </section>
);

DrinkDetails.propTypes = {
  className: PropTypes.string,
  drink: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      fluid: PropTypes.shape(),
    }),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    calories: PropTypes.number,
    notes: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string,
      }),
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

DrinkDetails.defaultProps = {
  className: '',
};

export default DrinkDetails;
