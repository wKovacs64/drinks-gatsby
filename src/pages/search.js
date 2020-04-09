import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Search from '../components/search';

const SearchPage = ({
  data: {
    allContentfulDrink: { edges },
  },
}) => {
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
      <Helmet
        title="Search Drinks"
        meta={[{ name: 'description', content: 'Search Drinks' }]}
      />
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
