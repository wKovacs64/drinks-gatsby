import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav';
import DrinkList from '../components/drink-list';
import { sortDrinks } from '../utils';

const IndexPage = ({
  data: {
    allContentfulDrink: { edges },
  },
}) => {
  return (
    <Layout>
      <SEO />
      <Nav>All Drinks</Nav>
      <SkipNavContent />
      <DrinkList drinks={sortDrinks(edges.map(({ node }) => node))} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allContentfulDrink {
      edges {
        node {
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
          notes {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allContentfulDrink: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
            image: PropTypes.shape({
              fluid: PropTypes.shape(),
            }),
            ingredients: PropTypes.arrayOf(PropTypes.string),
            calories: PropTypes.number,
            rank: PropTypes.number,
            createdAt: PropTypes.string,
            notes: PropTypes.shape({
              childMarkdownRemark: PropTypes.shape({
                rawMarkdownBody: PropTypes.string,
              }),
            }),
          }),
        }),
      ),
    }),
  }).isRequired,
};

export default IndexPage;
