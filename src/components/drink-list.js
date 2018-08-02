import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import Glass from './glass';
import DrinkSummary from './drink-summary';
import mq from '../utils/mq';

const DrinkList = ({ drinks }) =>
  drinks.map(({ drink }, index) => (
    <Link
      to={`/${drink.slug}`}
      key={drink.slug}
      className={css`
        margin: 1rem 0;
        ${mq.xl(css`
          margin: 2rem 0;
        `)};
        text-decoration: none;
      `}
    >
      <Glass
        className={css`
          ${mq.xl(css`
            width: 70rem;
          `)};
          transition: border-color 0.3s ease;

          &:hover,
          &:focus {
            border-color: #a62304;
          }
        `}
      >
        <DrinkSummary drink={drink} reverseRowLayout={index % 2 === 1} />
      </Glass>
    </Link>
  ));

DrinkList.propTypes = {
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

export default DrinkList;
