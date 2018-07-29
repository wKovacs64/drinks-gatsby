import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import Img from 'gatsby-image';
import mq from '../utils/mq';

const DrinkSummary = ({ className, drink, reverseRowLayout }) => (
  <Link
    to={drink.slug}
    className={css`
      ${className};
      color: #6d372a;
      border-color: #d09e45;
      border-width: 4px 0;
      ${mq.lg(css`
        border-width: 4px;
      `)};
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
        background-color: #eeeeee;
        display: flex;
        flex-direction: column;
        ${mq.md(css`
          flex-direction: ${reverseRowLayout ? 'row-reverse' : 'row'};
        `)};
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
              margin: 0;
              font-weight: 300;
              font-size: 1.5rem;
              ${mq.lg(css`
                font-size: 2.25rem;
              `)};
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
                margin-top: 2rem;
                margin-bottom: 2rem;
                padding-left: 2rem;
                ${mq.lg(css`
                  padding-left: 4rem;
                `)};
                font-size: 1.25rem;
                ${mq.lg(css`
                  font-size: 1.5rem;
                `)};
              `}
            >
              {drink.ingredients.map(ingredient => (
                <li
                  key={ingredient}
                  className={css`
                    margin-bottom: 0.5rem;
                  `}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={css`
              text-align: right;
              font-size: 1rem;
              ${mq.lg(css`
                font-size: 1.25rem;
              `)};
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
  reverseRowLayout: PropTypes.bool,
};

DrinkSummary.defaultProps = {
  className: '',
  reverseRowLayout: false,
};

export default DrinkSummary;
