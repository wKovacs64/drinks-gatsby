import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavLink from '../components/nav-link';
import NavDivider from '../components/nav-divider';
import TagList from '../components/tag-list';

const TagsPage = ({
  data: {
    allContentfulDrink: { group },
  },
}) => (
  <Layout>
    <Helmet
      title="Drink Tags"
      meta={[{ name: 'description', content: 'All drink tags' }]}
    />
    <Nav>
      <NavLink to="/">All Drinks</NavLink>
      <NavDivider />
      Tags
    </Nav>
    <TagList tags={group.map(({ fieldValue }) => fieldValue)} />
  </Layout>
);

export const query = graphql`
  query {
    allContentfulDrink {
      group(field: tags) {
        fieldValue
      }
    }
  }
`;

TagsPage.propTypes = {
  data: PropTypes.shape({
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
