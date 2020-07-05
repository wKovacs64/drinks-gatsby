import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav';
import NavLink from '../components/nav-link';
import NavDivider from '../components/nav-divider';
import TagList from '../components/tag-list';

const TagsPage = ({
  data: {
    site: { siteMetadata },
    allContentfulDrink: { group },
  },
}) => {
  const title = 'Ingredient Tags';
  const description = 'Discover drinks by ingredient';

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        socialImageUrl={siteMetadata.imageUrl}
        socialImageAlt={siteMetadata.imageAlt}
      />
      <Nav>
        <NavLink to="/">All Drinks</NavLink>
        <NavDivider />
        Tags
      </Nav>
      <SkipNavContent />
      <TagList tags={group.map(({ fieldValue }) => fieldValue)} />
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
      group(field: tags) {
        fieldValue
      }
    }
  }
`;

TagsPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        imageUrl: PropTypes.string,
        imageAlt: PropTypes.string,
      }),
    }).isRequired,
    allContentfulDrink: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

export default TagsPage;
