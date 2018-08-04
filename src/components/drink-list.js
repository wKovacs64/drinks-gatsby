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
      /* border: 2px solid red; */
      display: grid;
      grid-gap: 1rem;
      ${mq.sm(css`
        grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
        grid-gap: 2rem;
        /* justify-items: center; */
      `)};
      /* ${mq.sm(css`
        max-width: 28rem;
      `)}; */
      /* ${mq.lg(css`
        max-width: 36rem;
      `)}; */
      ${mq.xl(css`
        grid-gap: 2rem;
        justify-self: center;
        /* width: 90rem; */
      `)};
      ${className};
    `}
  >
    {drinks.map(({ drink }) => (
      <Link
        to={`/${drink.slug}`}
        key={drink.slug}
        className={css`
          /* height: 100%; */
          /* width: 26rem; */
          text-decoration: none;
        `}
      >
        <Glass
          className={css`
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
