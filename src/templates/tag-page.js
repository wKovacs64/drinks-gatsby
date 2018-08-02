import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Main from '../components/main';
import NavLink from '../components/nav-link';
import DrinkList from '../components/drink-list';
import mq from '../utils/mq';

const TagPage = ({
  pageContext: { tag },
  data: {
    allDrinks: { drinks },
  },
}) => (
  <Layout>
    <Main>
      <div
        className={css`
          display: none;
          ${mq.lg(css`
            display: block;
            color: #eeeeee;
            margin: 1rem 0;
          `)};
          ${mq.xl(css`
            margin: 0;
            width: 70rem;
          `)};
        `}
      >
        <NavLink to="/">All Drinks</NavLink>
        <span
          className={css`
            margin: 0 1rem;
          `}
        >
          ⇒
        </span>
        <NavLink to="/tags">Tags</NavLink>
        <span
          className={css`
            margin: 0 1rem;
          `}
        >
          ⇒
        </span>
        {tag}
      </div>
      <DrinkList drinks={drinks} />
    </Main>
  </Layout>
);

export const query = graphql`
  query($tag: String!) {
    allDrinks: allContentfulDrink(
      sort: { fields: [createdAt], order: ASC }
      filter: { tags: { glob: $tag } }
    ) {
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
