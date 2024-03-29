import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { SkipNavContent } from '@reach/skip-nav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import Glass from '../components/glass';
import DrinkSummary from '../components/drink-summary';
import DrinkDetails from '../components/drink-details';

function DrinkPage({ data: { contentfulDrink: drink } }) {
  const { title } = drink;
  const description = drink.ingredients.join(', ');
  const socialImageUrl = `https:${getSrc(drink.image.socialGatsbyImageData)}`;
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
        <ul>
          <NavLink to="/">All Drinks</NavLink>
          <NavDivider />
          <li className="inline">{drink.title}</li>
        </ul>
      </Nav>
      <SkipNavContent />
      <Glass>
        <DrinkSummary className="lg:flex-row" drink={drink} stacked />
        <DrinkDetails drink={drink} />
      </Glass>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    contentfulDrink(slug: { eq: $slug }) {
      title
      image {
        gatsbyImageData(
          layout: FULL_WIDTH
          aspectRatio: 1
          placeholder: BLURRED
          breakpoints: [320, 400, 480, 640]
        )
        socialGatsbyImageData: gatsbyImageData(
          layout: FIXED
          width: 1200
          height: 630
        )
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
        gatsbyImageData: PropTypes.shape(),
        socialGatsbyImageData: PropTypes.shape(),
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
