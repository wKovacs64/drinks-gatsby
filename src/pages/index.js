import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Nav from '../components/nav';
import DrinkList from '../components/drink-list';
import sortDrinks from '../utils/sort-drinks';

const IndexPage = ({
  data: {
    site: { siteMetadata },
    allContentfulDrink: { edges },
  },
}) => (
  <Layout>
    <Helmet
      title={siteMetadata.title}
      meta={[
        { name: 'description', content: siteMetadata.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: siteMetadata.title },
        { property: 'og:description', content: siteMetadata.description },
        { property: 'og:image', content: siteMetadata.imageUrl },
        { property: 'og:image:alt', content: siteMetadata.title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteMetadata.title },
        { name: 'twitter:description', content: siteMetadata.description },
        { name: 'twitter:image', content: siteMetadata.imageUrl },
        { name: 'twitter:image:alt', content: siteMetadata.title },
      ]}
    />
    <Nav>All Drinks</Nav>
    <DrinkList drinks={sortDrinks(edges.map(({ node }) => node))} />
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        imageUrl
      }
    }
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
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
      }),
    }),
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
