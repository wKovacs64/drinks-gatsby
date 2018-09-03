import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import orderBy from 'lodash.orderby';
import matchSorter, { rankings } from 'match-sorter';
import Layout from '../components/layout';
import Nav from '../components/nav';
import DrinkList from '../components/drink-list';
import mq from '../utils/mq';

class IndexPage extends Component {
  state = {
    searchTerm: '',
  };

  handleSearchTermChange = searchTerm => {
    this.setState(() => ({ searchTerm }));
  };

  render() {
    const {
      data: {
        site: { siteMetadata },
        allContentfulDrink: { edges },
      },
    } = this.props;
    const { searchTerm } = this.state;

    const drinks = edges.map(({ node }) => node);
    const filteredDrinks = matchSorter(drinks, searchTerm, {
      keys: [
        'title',
        'ingredients',
        'notes.childMarkdownRemark.rawMarkdownBody',
      ],
      threshold: rankings.CONTAINS,
    });
    const sortedFilteredDrinks = orderBy(
      filteredDrinks,
      ['rank', 'createdAt'],
      ['desc', 'desc'],
    );

    return (
      <Layout withSearch onSearchTermChange={this.handleSearchTermChange}>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: siteMetadata.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: siteMetadata.title },
            { property: 'og:description', content: siteMetadata.description },
            { property: 'og:image', content: siteMetadata.imageUrl },
            { property: 'og:image:alt', content: siteMetadata.title },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: siteMetadata.title },
            { name: 'twitter:description', content: siteMetadata.description },
            { name: 'twitter:image', content: siteMetadata.imageUrl },
            { name: 'twitter:image:alt', content: siteMetadata.title },
          ]}
        />
        <Nav>All Drinks</Nav>
        {filteredDrinks.length ? (
          <DrinkList drinks={sortedFilteredDrinks} />
        ) : (
          <span
            className={css`
              color: #eeeeee;
              font-size: 1.25rem;
              padding: 1rem;
              ${mq.sm(css`
                padding: 2rem 0;
              `)};
            `}
          >
            No drinks found.
          </span>
        )}
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        imageUrl
      }
    }
    allContentfulDrink {
      edges {
        node {
          title
          slug
          image {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
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

IndexPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    allContentfulDrink: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
            image: PropTypes.shape({
              fluid: PropTypes.shape(),
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

export default IndexPage;
