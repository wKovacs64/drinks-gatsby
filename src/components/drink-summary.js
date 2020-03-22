import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import Img from 'gatsby-image';
import mq from '../utils/mq';

const DrinkSummary = ({ drink, stacked, ...props }) => {
  const {
    file: { defaultImage },
  } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "icon.png" }) {
        defaultImage: childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <section
      css={css`
        height: 100%;
        background-color: #eeeeee;
        display: flex;
        flex-direction: column;
      `}
      {...props}
    >
      <figure
        css={css`
          flex: 1;
          margin: 0;
          ${!drink.image && `background-color: #1a1a17`};
        `}
      >
        <Img
          alt={drink.title}
          fluid={{
            ...(drink.image ? drink.image.fluid : defaultImage.fluid),
            aspectRatio: 1,
          }}
        />
      </figure>
      <div
        css={css`
          flex: 1;
          display: flex;
        `}
      >
        <div
          css={css`
            flex: 1;
            padding: ${stacked ? '2rem 2rem 0 2rem' : '2rem'};
            display: flex;
            flex-direction: column;
          `}
        >
          <h2
            css={css`
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-weight: 400;
              font-size: 1.5rem;
              ${mq.xl} {
                font-size: ${stacked && '2.25rem'};
              }
            `}
          >
            {drink.title}
          </h2>
          <div
            css={css`
              flex: 1;
            `}
          >
            <ul
              css={css`
                margin-top: 2rem;
                margin-bottom: 2rem;
                padding-left: 2rem;
                font-size: 1.25rem;
                ${mq.xl} {
                  font-size: ${stacked && '1.5rem'};
                }
              `}
            >
              {drink.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  css={css`
                    margin-bottom: 0.5rem;
                  `}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div
            css={css`
              text-align: right;
              font-size: ${stacked ? '1.25rem' : '1rem'};
            `}
          >
            {drink.calories ? <span>{drink.calories} cal</span> : ''}
          </div>
        </div>
      </div>
    </section>
  );
};

DrinkSummary.propTypes = {
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
  stacked: false,
};

export default DrinkSummary;
