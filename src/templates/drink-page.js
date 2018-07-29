import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const DrinkPage = ({ data: { drink } }) => (
  <Layout>
    <h2>{drink.title}</h2>
    {drink.image && <Img fixed={drink.image.fixed} />}
    <p>
      Ingredients:{' '}
      {drink.ingredients.map(ingredient => (
        <span key={ingredient}>{ingredient} </span>
      ))}
    </p>
    {drink.calories && <p>Calories: {drink.calories}</p>}
    {drink.notes && (
      <p
        dangerouslySetInnerHTML={{
          __html: drink.notes.childMarkdownRemark.html,
        }}
      />
    )}
    {drink.tags && (
      <p>
        Tags:{' '}
        {drink.tags.map(tag => (
          <span key={tag}>{tag} </span>
        ))}
      </p>
    )}
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    drink: contentfulDrink(slug: { eq: $slug }) {
      title
      image {
        fixed {
          ...GatsbyContentfulFixed_withWebp
        }
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
      title: PropTypes.string.isRequired,
      image: PropTypes.shape({
        fixed: PropTypes.shape(),
        fluid: PropTypes.shape(),
      }),
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
      calories: PropTypes.number,
      notes: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }),
      tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
};

export default DrinkPage;
