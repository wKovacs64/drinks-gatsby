import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Nav from '../components/nav';
import DrinkList from '../components/drink-list';
import mq from '../utils/mq';

const IndexPage = ({
  data: {
    allDrinks: { drinks },
  },
}) => (
  <Layout>
    <Nav>All Drinks</Nav>
    <DrinkList
      className={css`
        /* ${mq.md(css`
          margin: 1rem 0;
        `)};
        ${mq.xl(css`
          margin: 2rem 0;
        `)};
        ${mq.xl(css`
          width: 70rem;
        `)}; */
      `}
      drinks={drinks}
    />
  </Layout>
);

export const query = graphql`
  query {
    allDrinks: allContentfulDrink(sort: { fields: [createdAt], order: ASC }) {
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
