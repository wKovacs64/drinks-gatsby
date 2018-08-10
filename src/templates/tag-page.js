import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import orderBy from 'lodash.orderby';
import startCase from 'lodash.startcase';
import matchSorter, { rankings } from 'match-sorter';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavDivider from '../components/nav-divider';
import NavLink from '../components/nav-link';
import DrinkList from '../components/drink-list';
import mq from '../utils/mq';

class TagPage extends Component {
  state = {
    searchTerm: '',
  };

  handleSearchTermChange = searchTerm => {
    this.setState(() => ({ searchTerm }));
  };

  render() {
    const {
      pageContext: { tag },
      data,
    } = this.props;
    const { searchTerm } = this.state;

    const drinks = data.allContentfulDrink.edges.map(({ node }) => node);
    const filteredDrinks = matchSorter(drinks, searchTerm, {
      keys: [
        'title',
        'ingredients',
        'notes.childMarkdownRemark.rawMarkdownBody',
      ],
      threshold: rankings.CONTAINS,
    });

    return (
      <Layout withSearch onSearchTermChange={this.handleSearchTermChange}>
        <Helmet
          title={startCase(`${tag} drinks`)}
          meta={[{ name: 'description', content: `Drinks using ${tag}` }]}
        />
        <Nav>
          <NavLink to="/">All Drinks</NavLink>
          <NavDivider />
          <NavLink to="/tags">Tags</NavLink>
          <NavDivider />
          {tag}
          <span
            className={css`
              margin-left: 0.5rem;
            `}
          >
            ( {data.allContentfulDrink.totalCount} )
          </span>
        </Nav>
        {filteredDrinks.length ? (
          <DrinkList
            drinks={orderBy(
              filteredDrinks,
              ['rank', 'createdAt'],
              ['desc', 'desc'],
            )}
          />
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
  query($tag: String!) {
    allContentfulDrink(filter: { tags: { glob: $tag } }) {
      totalCount
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
    allContentfulDrink: PropTypes.shape({
      totalCount: PropTypes.number,
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

export default TagPage;
