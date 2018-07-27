import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from 'react-emotion';
import Layout from '../components/layout';

const IndexPage = ({ data: { allDrinks } }) => (
  <Layout>
    <div
      className={css`
        height: 100%;
        padding-top: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          bottom: 0;
          left: 50%;
          border-left: 4px solid #d09e45;
          transform: translate(-50%);
        }
      `}
    >
      {allDrinks.drinks.map(({ drink }) => (
        <Link
          key={drink.slug}
          to={drink.slug}
          className={css`
            color: #6d372a;
            border: 4px solid #d09e45;
            text-decoration: none;
            margin-bottom: 3rem;

            -moz-osx-font-smoothing: grayscale;
            backface-visibility: hidden;
            transform: translateZ(0);
            transition: transform 0.25s ease-out;

            &:hover,
            &:focus {
              transform: scale(1.025);
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
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allDrinks: allContentfulDrink(sort: { fields: [createdAt], order: DESC }) {
      totalCount
      drinks: edges {
        drink: node {
          title
          slug
          image {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          ingredients
          calories
          tags
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allDrinks: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      drinks: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          slug: PropTypes.string,
          image: PropTypes.shape({
            fluid: PropTypes.shape(),
          }),
          ingredients: PropTypes.arrayOf(PropTypes.string),
          calories: PropTypes.number,
          tags: PropTypes.arrayOf(PropTypes.string),
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default IndexPage;
