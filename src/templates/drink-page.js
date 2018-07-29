import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Container from '../components/container';
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
    <Container
      className={css`
        height: 100%;
        justify-content: center;
        padding: 0;
        ${mq.lg(css`
          padding: 0;
        `)};
      `}
    >
      <Glass
        className={css`
          ${mq.lg(css`
            border-width: 4px 0;
          `)};
          ${mq.xl(css`
            border-width: 4px;
            width: 70rem;
          `)};
        `}
      >
        <DrinkSummary drink={drink} />
        <DrinkDetails drink={drink} />
      </Glass>
    </Container>
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
