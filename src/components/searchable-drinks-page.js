import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import difference from 'lodash.difference';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import matchSorter from 'match-sorter';
import mq from '../utils/mq';
import Layout from './layout';
import DrinkList from './drink-list';

class SearchableDrinksPage extends Component {
  state = { searchTerm: '' };

  handleSearchTermChange = searchTerm => this.setState({ searchTerm });

  render() {
    const { children, drinks } = this.props;
    const { searchTerm } = this.state;
    const containsSearchTerm = new RegExp(searchTerm, 'i');

    const titleMatchedDrinks = matchSorter(drinks, searchTerm, {
      keys: ['title'],
    });
    const otherMatchedDrinks = orderBy(
      difference(drinks, titleMatchedDrinks).filter(
        drink =>
          containsSearchTerm.test(
            get(drink, 'notes.childMarkdownRemark.rawMarkdownBody'),
          ) || containsSearchTerm.test(drink.ingredients),
      ),
      ['rank', 'createdAt'],
      ['desc', 'desc'],
    );
    const filteredDrinks = [...titleMatchedDrinks, ...otherMatchedDrinks];
    const sortedDrinks = orderBy(
      drinks,
      ['rank', 'createdAt'],
      ['desc', 'desc'],
    );

    return (
      <Layout withSearch onSearchTermChange={this.handleSearchTermChange}>
        {children}
        {filteredDrinks.length ? (
          <DrinkList drinks={searchTerm ? filteredDrinks : sortedDrinks} />
        ) : (
          <span
            css={css`
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

SearchableDrinksPage.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  children: PropTypes.node,
};

SearchableDrinksPage.defaultProps = {
  children: null,
};

export default SearchableDrinksPage;
