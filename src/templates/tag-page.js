import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import startCase from 'lodash/startCase';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import DrinkList from '../components/drink-list';
import sortDrinks from '../utils/sort-drinks';

const TagPage = ({
  pageContext: { tag },
  data: {
    allContentfulDrink: { edges, totalCount },
  },
}) => (
  <Layout>
    <Helmet
      title={startCase(`${tag} drinks`)}
      meta={[{ name: 'description', content: `Drinks using ${tag}` }]}
    />
    <Nav>
      <NavLink to="/">All Drinks</NavLink>
      <NavDivider />
      <NavLink to="/tags/">Tags</NavLink>
      <NavDivider />
      {tag}
      <span
        css={css`
          margin-left: 0.5rem;
        `}
      >
        ( {totalCount} )
      </span>
    </Nav>
    <DrinkList drinks={sortDrinks(edges.map(({ node }) => node))} />
  </Layout>
);

export const query = graphql`
  query($tag: String!) {
    allContentfulDrink(filter: { tags: { glob: $tag } }) {
      totalCount
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

TagPage.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    allContentfulDrink: PropTypes.shape({
      totalCount: PropTypes.number,
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

export default TagPage;
