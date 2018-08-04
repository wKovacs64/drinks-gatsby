import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Main from '../components/main';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import DrinkList from '../components/drink-list';
import mq from '../utils/mq';

const TagPage = ({ pageContext: { tag }, data }) => (
  <Layout>
    <Main>
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
      <DrinkList
        className={css`
          ${mq.md(css`
            margin: 1rem 0;
          `)};
          ${mq.xl(css`
            margin: 2rem 0;
          `)};
          ${mq.xl(css`
            width: 70rem;
          `)};
        `}
        drinks={data.allDrinks.drinks}
      />
    </Main>
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

export default TagPage;
