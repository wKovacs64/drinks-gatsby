import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import { SkipNavContent } from '@reach/skip-nav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import Glass from '../components/glass';
import DrinkSummary from '../components/drink-summary';
import DrinkDetails from '../components/drink-details';
import { mq } from '../utils';

function DrinkPage({ data: { contentfulDrink: drink } }) {
  const { title } = drink;
  const description = drink.ingredients.join(', ');
  const socialImageUrl = `https:${drink.image.fixed.src}`;
  // TODO: add image alt to Contentful drink model?
  const socialImageAlt = `${title} in a glass`;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        socialImageUrl={socialImageUrl}
        socialImageAlt={socialImageAlt}
      />
      <Nav>
        <NavLink to="/">All Drinks</NavLink>
        <NavDivider />
        {drink.title}
      </Nav>
      <SkipNavContent />
      <Glass>
        <DrinkSummary
          css={css`
            ${mq.lg} {
              flex-direction: row;
            }
          `}
          drink={drink}
          stacked
        />
        <DrinkDetails drink={drink} />
      </Glass>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    contentfulDrink(slug: { eq: $slug }) {
      title
      image {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(width: 1200, height: 630) {
          src
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
    contentfulDrink: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.shape({
        fluid: PropTypes.shape(),
        fixed: PropTypes.shape({
          src: PropTypes.string,
        }),
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
