import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import Glass from '../components/glass';
import DrinkSummary from '../components/drink-summary';
import DrinkDetails from '../components/drink-details';
import mq from '../utils/mq';

const DrinkPage = ({ data: { drink } }) => (
  <Layout>
    <Helmet
      title={drink.title}
      meta={[
        { name: 'description', content: drink.title },
        {
          name: 'keywords',
          content: ['drink', 'cocktail', ...drink.tags].join(', '),
        },
      ]}
    />
    <Nav>
      <NavLink to="/">All Drinks</NavLink>
      <NavDivider />
      {drink.title}
    </Nav>
    <Glass>
      <DrinkSummary
        className={css`
          ${mq.lg(css`
            flex-direction: row;
          `)};
        `}
        drink={drink}
        stacked
      />
      <DrinkDetails drink={drink} />
    </Glass>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    drink: contentfulDrink(slug: { eq: $slug }) {
      title
      image {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      ingredients
      calories
      notes {
        childMarkdownRemark {
          html
        }
      }
      tags
    }
  }
`;

DrinkPage.propTypes = {
  data: PropTypes.shape({
    drink: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
      ingredients: PropTypes.arrayOf(PropTypes.string),
      calories: PropTypes.number,
      notes: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }).isRequired,
      }),
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default DrinkPage;
