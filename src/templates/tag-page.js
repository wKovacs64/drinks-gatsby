import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import DrinkList from '../components/drink-list';

const TagPage = ({ pageContext: { tag }, data }) => (
  <Layout>
    <Nav>
      <NavLink to="/">All Drinks</NavLink>
      <NavDivider />
      <NavLink to="/tags">Tags</NavLink>
      <NavDivider />
      {tag}
      <span
        className={css`
          margin-left: 0.5rem;
        `}
      >
        ( {data.allDrinks.totalCount} )
      </span>
    </Nav>
    <DrinkList drinks={data.allDrinks.drinks.map(({ drink }) => drink)} />
  </Layout>
);

export const query = graphql`
  query($tag: String!) {
    allDrinks: allContentfulDrink(
      sort: { fields: [createdAt], order: ASC }
      filter: { tags: { glob: $tag } }
    ) {
      totalCount
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

TagPage.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    allDrinks: PropTypes.shape({
      totalCount: PropTypes.number,
      drinks: PropTypes.arrayOf(
        PropTypes.shape({
          drink: PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
            image: PropTypes.shape({
              fluid: PropTypes.shape(),
            }),
            ingredients: PropTypes.arrayOf(PropTypes.string),
            calories: PropTypes.number,
          }),
        }),
      ),
    }),
  }).isRequired,
};

export default TagPage;
