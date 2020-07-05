import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Search from '../components/search';

const SearchPage = ({
  data: {
    site: { siteMetadata },
    allContentfulDrink: { edges },
  },
}) => {
  const title = 'Search Drinks';
  const description = 'Search all drinks by ingredient or description';

  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const handleEsc = ({ keyCode }) => {
      if (keyCode === 27 /* ESC */) {
        setSearchTerm('');
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

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
        setSearchTerm={setSearchTerm}
        drinks={edges.map(({ node }) => node)}
      />
    </Layout>
  );
};

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
};

export default SearchPage;
