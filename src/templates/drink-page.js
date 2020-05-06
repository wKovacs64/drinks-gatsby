import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import Glass from '../components/glass';
import DrinkSummary from '../components/drink-summary';
import DrinkDetails from '../components/drink-details';
import mq from '../utils/mq';

const DrinkPage = ({ data: { contentfulDrink: drink } }) => {
  const description = drink.ingredients.join(', ');
  const socialImageUrlSrc = drink?.image?.fixed?.src;
  const socialImageUrl = socialImageUrlSrc && `https:${socialImageUrlSrc}`;

  return (
    <Layout>
      <Helmet
        title={drink.title}
        meta={[
          { name: 'description', content: description },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: drink.title },
          { property: 'og:description', content: description },
          socialImageUrl && { property: 'og:image', content: socialImageUrl },
          socialImageUrl && { property: 'og:image:alt', content: drink.title },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: drink.title },
          { name: 'twitter:description', content: description },
          socialImageUrl && { name: 'twitter:image', content: socialImageUrl },
          socialImageUrl && { name: 'twitter:image:alt', content: drink.title },
        ].filter(Boolean)}
      />
      <Nav>
        <NavLink to="/">All Drinks</NavLink>
        <NavDivider />
        {drink.title}
      </Nav>
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
};

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
