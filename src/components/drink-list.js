import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import Glass from './glass';
import DrinkSummary from './drink-summary';
import mq from '../utils/mq';

const DrinkList = ({ drinks, ...props }) => (
  <div
    css={css`
      display: grid;
      grid-gap: 1rem;
      ${mq.sm} {
        grid-gap: 2rem;
      }
      ${mq.lg} {
        grid-template-columns: repeat(2, 1fr);
      }
      ${mq.xl} {
        grid-template-columns: repeat(3, 1fr);
      }
    `}
    {...props}
  >
    {drinks.map(drink => (
      <Link
        to={`/${drink.slug}/`}
        key={drink.slug}
        css={css`
          text-decoration: none;
        `}
      >
        <Glass
          css={css`
            height: 100%;
            transition: border-color 0.3s ease;
            a:focus &, /* inside a focused <a> */
            &:hover {
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
