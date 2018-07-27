import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const IndexPage = ({ data: { allDrinks } }) => (
  <Layout>
    <p>Total drinks: {allDrinks.totalCount}</p>
    {allDrinks.drinks.map(({ drink }) => (
      <Link key={drink.slug} to={drink.slug}>
        {drink.image && <Img fixed={drink.image.fixed} />}
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
            fixed(height: 200, width: 200) {
              ...GatsbyContentfulFixed_withWebp
            }
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
            fixed: PropTypes.shape(),
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
