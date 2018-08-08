import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import orderBy from 'lodash.orderby';
import Layout from '../components/layout';
import Nav from '../components/nav';
import DrinkList from '../components/drink-list';

const IndexPage = ({
  data: {
    allDrinks: { drinks },
  },
}) => (
  <Layout>
    <Nav>All Drinks</Nav>
    <DrinkList
      drinks={orderBy(
        drinks,
        ['drink.rank', 'drink.createdAt'],
        ['desc', 'desc'],
      )}
    />
  </Layout>
);

export const query = graphql`
  query {
    allDrinks: allContentfulDrink {
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
          rank
          createdAt
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allDrinks: PropTypes.shape({
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
      ),
    }),
  }).isRequired,
};

export default IndexPage;
