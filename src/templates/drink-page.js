import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled, { css } from 'react-emotion';
import Layout from '../components/layout';
import Main from '../components/main';
import Glass from '../components/glass';
import DrinkSummary from '../components/drink-summary';
import DrinkDetails from '../components/drink-details';
import mq from '../utils/mq';

const NavLink = styled(Link)`
  padding-bottom: 0.25rem;
  color: currentColor;
  text-decoration: none;
  border-bottom: 1px solid #cccccc;
  box-shadow: inset 0 -2px 0 0 #cccccc;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    color: #f4f4f4;
    border-color: #f4f4f4;
    box-shadow: inset 0 -2px 0 0 #f4f4f4;
  }
`;

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
    <Main
      className={css`
        height: 100%;
        justify-content: center;
        padding: 0;
        ${mq.lg(css`
          padding: 0;
        `)};
      `}
    >
      <div
        className={css`
          display: none;
          ${mq.xl(css`
            display: block;
            color: #eeeeee;
            margin: 2rem 0;
            width: 70rem;
          `)};
        `}
      >
        <NavLink to="../">All Drinks</NavLink>
        <span
          className={css`
            margin: 0 1rem;
          `}
        >
          ⇒
        </span>
        {drink.title}
      </div>
      <Glass
        className={css`
          ${mq.lg(css`
            margin: 2rem 0;
          `)};
          ${mq.xl(css`
            margin: 0 0 4rem 0;
          `)};
          ${mq.lg(css`
            border-width: 4px 0;
          `)};
          ${mq.xl(css`
            border-width: 4px;
            width: 70rem;
          `)};
        `}
      >
        <DrinkSummary drink={drink} stacked />
        <DrinkDetails drink={drink} />
      </Glass>
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
