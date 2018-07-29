import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import Img from 'gatsby-image';

const DrinkSummary = ({ className, drink }) => (
  <Link
    key={drink.slug}
    to={drink.slug}
    className={css`
      ${className};
      color: #6d372a;
      border-color: #d09e45;
      border-width: 4px;
      border-style: double;
      text-decoration: none;

      &:hover,
      &:focus {
        border-color: #a62304;
      }
    `}
  >
    <article
      className={css`
        display: flex;
        background-color: #eeeeee;
        width: 100vw;
        max-width: 1024px;
      `}
    >
      <figure
        className={css`
          flex: 1;
          margin: 0;
        `}
      >
        {drink.image ? <Img fluid={drink.image.fluid} /> : null}
      </figure>
      <section
        className={css`
          flex: 1;
          display: flex;
        `}
      >
        <div
          className={css`
            flex: 1;
            padding: 2rem;
            display: flex;
            flex-direction: column;
          `}
        >
          <h2
            className={css`
              margin-top: 0;
              font-weight: 300;
              font-size: 2.25rem;
            `}
          >
            {drink.title}
          </h2>
          <div
            className={css`
              flex: 1;
            `}
          >
            <ul
              className={css`
                font-size: 1.25rem;
              `}
            >
              {drink.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div
            className={css`
              text-align: right;
              font-size: 1.5rem;
              font-weight: 300;
            `}
          >
            {drink.calories ? <span>{drink.calories} cal</span> : ''}
          </div>
        </div>
      </section>
    </article>
  </Link>
);

DrinkSummary.propTypes = {
  className: PropTypes.string,
  drink: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    image: PropTypes.shape({
      fluid: PropTypes.shape(),
    }),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    calories: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

DrinkSummary.defaultProps = {
  className: '',
};

export default DrinkSummary;
