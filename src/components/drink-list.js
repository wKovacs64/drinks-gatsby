import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import Glass from './glass';
import DrinkSummary from './drink-summary';
import mq from '../utils/mq';

const DrinkList = ({ className, drinks }) => (
  <div
    className={css`
      display: grid;
      grid-gap: 1rem;
      ${mq.sm(css`
        grid-gap: 2rem;
      `)};
      ${mq.lg(css`
        grid-template-columns: repeat(2, 1fr);
      `)};
      ${mq.xl(css`
        grid-template-columns: repeat(3, 1fr);
      `)};
      ${className};
    `}
  >
    {drinks.map(({ drink }) => (
      <Link
        to={`/${drink.slug}`}
        key={drink.slug}
        className={css`
          text-decoration: none;
        `}
      >
        <Glass
          className={css`
            height: 100%;
            transition: border-color 0.3s ease;

            &:hover,
            &:focus {
              border-color: #a62304;
            }
          `}
        >
          <DrinkSummary drink={drink} />
        </Glass>
      </Link>
    ))}
  </div>
);

DrinkList.propTypes = {
  className: PropTypes.string,
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      image: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
      ingredients: PropTypes.arrayOf(PropTypes.string),
      calories: PropTypes.number,
    }),
  ).isRequired,
};

DrinkList.defaultProps = {
  className: '',
};

export default DrinkList;
