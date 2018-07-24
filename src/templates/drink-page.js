import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const DrinkPage = ({ data: { drink } }) => (
  <Layout>
    <h2>{drink.title}</h2>
    {drink.image && <p>Image URL: {drink.image.file.url}</p>}
    <p>
      Ingredients:{' '}
      {drink.ingredients.map(ingredient => <span>{ingredient} </span>)}
    </p>
    {drink.calories && <p>Calories: {drink.calories}</p>}
    {drink.notes && (
      <p
        dangerouslySetInnerHTML={{
          __html: drink.notes.childMarkdownRemark.html,
        }}
      />
    )}
    {drink.tags && <p>Tags: {drink.tags.map(tag => <span>{tag} </span>)}</p>}
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    drink: contentfulDrink(slug: { eq: $slug }) {
      title
      image {
        file {
          url
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
        file: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
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
