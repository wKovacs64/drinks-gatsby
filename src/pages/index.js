import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = ({ data: { allDrinks } }) => (
  <Layout>
    <p>Total drinks: {allDrinks.totalCount}</p>
    {allDrinks.drinks.map(({ drink }) => (
      <Link key={drink.slug} to={drink.slug}>
        {drink.title}
        {drink.calories && ` (${drink.calories})`}
      </Link>
    ))}
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
            file {
              url
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
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          image: PropTypes.shape({
            file: PropTypes.shape({
              url: PropTypes.string.isRequired,
            }).isRequired,
          }),
          ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
          calories: PropTypes.number,
          tags: PropTypes.arrayOf(PropTypes.string),
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default IndexPage;
