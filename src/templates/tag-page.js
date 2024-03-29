import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';
import startCase from 'lodash/startCase';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import DrinkList from '../components/drink-list';
import { sortDrinks } from '../utils';

function TagPage({
  pageContext: { tag },
  data: {
    site: { siteMetadata },
    allContentfulDrink: { edges, totalCount },
  },
}) {
  const title = `Drinks with ${startCase(tag)}`;
  const description = `All drinks containing ${tag}`;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        socialImageUrl={siteMetadata.imageUrl}
        socialImageAlt={siteMetadata.imageAlt}
      />
      <Nav>
        <ul>
          <NavLink to="/">All Drinks</NavLink>
          <NavDivider />
          <NavLink to="/tags/">Tags</NavLink>
          <NavDivider />
          <li className="inline">{tag}</li>
          <li className="ml-2 inline">( {totalCount} )</li>
        </ul>
      </Nav>
      <SkipNavContent />
      <DrinkList drinks={sortDrinks(edges.map(({ node }) => node))} />
    </Layout>
  );
}

export const query = graphql`
  query ($tag: String!) {
    site {
      siteMetadata {
        imageUrl
        imageAlt
      }
    }
    allContentfulDrink(filter: { tags: { glob: $tag } }) {
      totalCount
      edges {
        node {
          title
          slug
          image {
            gatsbyImageData(
              layout: FULL_WIDTH
              aspectRatio: 1
              placeholder: BLURRED
              breakpoints: [320, 400, 420, 460]
            )
          }
          ingredients
          calories
          rank
          createdAt
          notes {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
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
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        imageUrl: PropTypes.string,
        imageAlt: PropTypes.string,
      }),
    }).isRequired,
    allContentfulDrink: PropTypes.shape({
      totalCount: PropTypes.number,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
            image: PropTypes.shape({
              gatsbyImageData: PropTypes.shape(),
            }),
            ingredients: PropTypes.arrayOf(PropTypes.string),
            calories: PropTypes.number,
            rank: PropTypes.number,
            createdAt: PropTypes.string,
            notes: PropTypes.shape({
              childMarkdownRemark: PropTypes.shape({
                rawMarkdownBody: PropTypes.string,
              }),
            }),
          }),
        }),
      ),
    }),
  }).isRequired,
};

export default TagPage;
