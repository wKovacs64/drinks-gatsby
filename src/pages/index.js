import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import DrinkSummary from '../components/drink-summary';
import mq from '../utils/mq';

const IndexPage = ({ data: { allDrinks } }) => (
  <Layout>
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 0;
        ${mq.lg(css`
          padding: 2rem 0;
        `)};
      `}
    >
      {allDrinks.drinks.map(({ drink }) => (
        <DrinkSummary
          className={css`
            margin: 1rem 0;
            ${mq.lg(css`
              margin: 2rem 0;
            `)};
          `}
          drink={drink}
        />
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
