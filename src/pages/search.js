import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';
import queryString from 'query-string';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Search from '../components/search';

function SearchPage({
  data: {
    site: { siteMetadata },
    allContentfulDrink: { edges },
  },
  location,
  navigate,
}) {
  const title = 'Search Drinks';
  const description = 'Search all drinks by ingredient or description';

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchInputValue, setSearchInputValue] = React.useState('');

  // sync searchTerm to query string value from location on route change
  React.useEffect(() => {
    setSearchTerm(queryString.parse(location.search).searchTerm || '');
  }, [location.search]);

  // sync local input value to searchTerm on route change
  React.useEffect(() => {
    setSearchInputValue(searchTerm);
  }, [searchTerm]);

  function handleSubmit() {
    if (searchInputValue) {
      navigate(
        `?${queryString.stringify(
          { searchTerm: searchInputValue },
          { encode: true },
        )}`,
      );
    }
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        socialImageUrl={siteMetadata.imageUrl}
        socialImageAlt={siteMetadata.imageAlt}
      />
      <SkipNavContent />
      <Search
        searchTerm={searchTerm}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        onSubmit={handleSubmit}
        drinks={edges.map(({ node }) => node)}
      />
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        imageUrl
        imageAlt
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

SearchPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        imageUrl: PropTypes.string,
        imageAlt: PropTypes.string,
      }),
    }).isRequired,
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
  location: PropTypes.shape().isRequired,
  navigate: PropTypes.func.isRequired,
};

export default SearchPage;
