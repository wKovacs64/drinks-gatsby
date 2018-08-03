import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Main from '../components/main';
import Nav from '../components/nav';
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
    <Main>
      <Nav>
        <NavLink to="../">All Drinks</NavLink>
        <span
          className={css`
            margin: 0 1rem;
          `}
        >
          ⇒
        </span>
        {drink.title}
      </Nav>
      <div
        className={css`
          ${mq.xl(css`
            width: 70rem;
          `)};
        `}
      >
        <Glass
          className={css`
            ${mq.md(css`
              margin: 1rem 0;
            `)};
            ${mq.xl(css`
              margin: 2rem 0;
            `)};
            ${mq.lg(css`
              border-width: 4px 0;
            `)};
            ${mq.xl(css`
              border-width: 4px;
            `)};
          `}
        >
          <DrinkSummary drink={drink} stacked />
          <DrinkDetails drink={drink} />
        </Glass>
      </div>
    </Main>
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
