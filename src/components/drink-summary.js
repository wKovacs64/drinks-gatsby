import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css } from 'react-emotion';
import Img from 'gatsby-image';
import mq from '../utils/mq';

const DrinkSummary = ({ className, drink, stacked }) => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "icon.png" }) {
          defaultImage: childImageSharp {
            fluid(quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={({ file: { defaultImage } }) => (
      <section
        className={css`
          background-color: #eeeeee;
          display: flex;
          flex-direction: column;
          ${className};
        `}
      >
        <figure
          className={css`
            flex: 1;
            margin: 0;
            ${!drink.image && `background-color: #1a1a17`};
          `}
        >
          <Img
            alt={drink.title}
            fluid={drink.image ? drink.image.fluid : defaultImage.fluid}
          />
        </figure>
        <div
          className={css`
            flex: 1;
            display: flex;
          `}
        >
          <div
            className={css`
              flex: 1;
              padding: ${stacked ? '2rem 2rem 0 2rem' : '2rem'};
              display: flex;
              flex-direction: column;
            `}
          >
            <h2
              className={css`
                margin: 0;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-weight: 400;
                font-size: 1.5rem;
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
                  font-size: 1.25rem;
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
        </div>
      </section>
    )}
  />
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
  stacked: PropTypes.bool,
};

DrinkSummary.defaultProps = {
  className: '',
  stacked: false,
};

export default DrinkSummary;
